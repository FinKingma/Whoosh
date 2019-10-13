'use strict'
import data from '../assets/presets.json';

export class Car {
  leftPos:number = 0
  topPos:number = 0
  speed:number = 0
  width:number = 40
  length:number = 80
  driftSpeed:number = 0
  carDirection:number = 0
  moveDirection:number = 0
  forward:boolean = false
  backward:boolean = false
  left:boolean = false
  right:boolean = false
  break:boolean = false
  data:any

  constructor () {
    this.data = data
  }
  placeCar(leftPos:number, topPos:number) {
    this.leftPos = leftPos
    this.topPos = topPos
  }
  animate() {
    this.adjustSpeedAndDirection()
    this.adjustPosition()
  }
  adjustSpeedAndDirection() {
    if (this.forward) this.moveForward();
    if (this.backward) this.moveBackward();
    if (this.left) this.steerLeft();
    if (this.right) this.steerRight();
    if (this.break) this.doBreak();
    
    if (!this.break) {
      let directionDifference = this.carDirection - this.moveDirection
      this.moveDirection += directionDifference / ((Math.abs(this.speed) / 10) + 1)
    }

    this.speed *= this.data.friction

  }
  adjustPosition() {
    let leftMovement = Math.sin(this.toRadians(this.moveDirection)) * this.speed
    let topMovement = Math.cos(this.toRadians(this.moveDirection)) * this.speed

    this.leftPos += leftMovement
    this.topPos -= topMovement
  }
  moveForward() {
    if (this.speed < this.data.maxSpeed) {
      this.speed++
      this.updateDriftSpeed()
    }
  }
  moveBackward() {
    if (this.speed > -this.data.maxSpeed) {
      this.speed--
      this.updateDriftSpeed()
    }
  }
  doBreak() {
    if (this.speed >= 1) {
      this.speed--;
    } else if (this.speed <= -1) {
      this.speed++;
    } else {
      this.speed = 0;
    }
  }
  updateDriftSpeed() {
    this.driftSpeed = this.speed
  }
  steerLeft() {
    if (this.speed >= 0) {
      this.carDirection-=this.getTurnSpeed();
    } else {
      this.carDirection+=this.getTurnSpeed();
    }
  }
  steerRight() {
    if (this.speed >= 0) {
      this.carDirection+=this.getTurnSpeed();
    } else {
      this.carDirection-=this.getTurnSpeed();
    }
  }
  getTurnSpeed() {
    if (this.break) {
      return (this.data.turnSpeed * (Math.abs((this.driftSpeed * this.speed) / 5) / 10))
    }
    
    return (this.data.turnSpeed * (Math.abs(this.speed) / 10))
  }
  toRadians (angle:number) {
    return angle * (Math.PI / 180);
  }
}
