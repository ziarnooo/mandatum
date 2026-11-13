const emailPattern=/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/;
const json=(status,message)=>Response.json({ok:status===200,message},{status,headers:{'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}});
async function readLimited(request,max=20000){
 const reader=request.body?.getReader();if(!reader)return '';
 const chunks=[];let size=0;while(true){const {done,value}=await reader.read();if(done)break;size+=value.byteLength;if(size>max){await reader.cancel();throw new Error('too-large')}chunks.push(value);}
 const bytes=new Uint8Array(size);let offset=0;for(const chunk of chunks){bytes.set(chunk,offset);offset+=chunk.byteLength;}return new TextDecoder().decode(bytes);
}
export async function handleContact(request,env,fetcher=fetch){
 if(request.method!=='POST')return new Response('Method not allowed',{status:405,headers:{Allow:'POST'}});
 const origin=new URL(request.url).origin;
 if(request.headers.get('Origin')!==origin)return json(403,'Please send your message from our contact page.');
 if(!request.headers.get('Content-Type')?.startsWith('application/x-www-form-urlencoded'))return json(415,'Unsupported form format.');
 let form;try{form=new URLSearchParams(await readLimited(request));}catch{return json(413,'Your message is too long. Please shorten it and try again.');}
 const name=(form.get('name')||'').trim(),email=(form.get('email')||'').trim(),message=(form.get('message')||'').trim(),token=form.get('cf-turnstile-response')||'';
 if(name.length<2||name.length>100||/[\r\n\x00-\x1f]/.test(name))return json(400,'Please enter your name (2–100 characters).');
 if(email.length>254||!emailPattern.test(email))return json(400,'Please enter a valid email address.');
 if(message.length<10||message.length>5000)return json(400,'Please enter a message of 10–5,000 characters.');
 if(form.get('website'))return json(400,'We could not verify this request. Please email our team instead.');
 if(env.PREVIEW!=='false'||!env.EMAIL?.send||!env.TURNSTILE_SECRET_KEY||!env.CONTACT_FROM||!env.CONTACT_TO)return json(503,'Sending is not available yet. Please email info@themandatum.org.');
 if(!token||token.length>2048)return json(400,'Please complete the spam check and try again.');
 try{
  const verify=await fetcher('https://challenges.cloudflare.com/turnstile/v0/siteverify',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({secret:env.TURNSTILE_SECRET_KEY,response:token,remoteip:request.headers.get('CF-Connecting-IP')||undefined}),signal:AbortSignal.timeout(8000)});
  if(!verify.ok)return json(503,'Spam verification is unavailable. Please try again shortly.');
  const result=await verify.json();
  if(!result.success||result.hostname!==new URL(request.url).hostname||result.action!=='contact')return json(400,'The spam check expired or failed. Please complete it again.');
  const sent=await env.EMAIL.send({from:env.CONTACT_FROM,to:env.CONTACT_TO,replyTo:email,subject:'New Mandatum website enquiry',text:`Name: ${name}\nEmail: ${email}\n\n${message}`});
  if(!sent?.messageId)return json(502,'We could not confirm sending. Please email info@themandatum.org.');
  return json(200,'Thank you. Your message has been submitted to our team.');
 }catch{return json(503,'The service is temporarily unavailable. Please try again later or email info@themandatum.org.');}
}
