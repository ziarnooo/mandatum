import assert from 'node:assert/strict';import {profileFrame,PROFILE_DURATION} from '../public/review/profile-motion.js';
assert.deepEqual(profileFrame(0),{profile:0,stage:0,step:0});
assert.equal(profileFrame(1000).stage,1);assert.equal(profileFrame(2500).stage,2);
assert.equal(profileFrame(2500).step,0);assert.equal(profileFrame(4000).step,1);assert.equal(profileFrame(6000).step,2);
assert.equal(profileFrame(8000).stage,5);
assert.equal(profileFrame(8399).stage,5);assert.equal(profileFrame(8400).stage,6);assert.equal(profileFrame(PROFILE_DURATION-1).stage,6);
assert.equal(profileFrame(PROFILE_DURATION).profile,1);assert.equal(profileFrame(PROFILE_DURATION*2).profile,2);assert.equal(profileFrame(PROFILE_DURATION*3).profile,0);
console.log('PASS: one military role → three Mandatum steps → one civilian role; three complete profiles.');
