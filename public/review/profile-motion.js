export const PROFILE_DURATION = 14000;
export function profileFrame(elapsed){
 const time=Math.max(0,elapsed)%PROFILE_DURATION;
 return {profile:Math.floor(Math.max(0,elapsed)/PROFILE_DURATION)%3,stage:time<600?0:time<2000?1:time<3800?2:time<5600?3:time<7400?4:time<8400?5:6,step:time<3800?0:time<5600?1:2};
}
