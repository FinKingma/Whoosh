'use strict'
import data from '../assets/presets.json';

export class Car {
  leftPos:number = 0
  topPos:number = 0
  speed:number = 0
  width:number = 0
  length:number = 0
  driftSpeed:number = 0
  carDirection:number = 0
  moveDirection:number = 0
  forward:boolean = false
  backward:boolean = false
  left:boolean = false
  right:boolean = false
  break:boolean = false
  data:any
  cornerData = {
    distance: 0,
    degree: 0,
    frontLeft: {
      x: 0,
      y: 0
    },
    frontRight:{
      x: 0,
      y: 0
    },
    rearLeft: {
      x: 0,
      y: 0
    },
    rearRight: {
      x: 0,
      y: 0
    }
  }

  constructor () {
    this.data = data
  }
  placeCar(width: number, length:number, leftPos:number, topPos:number) {
    this.width = width
    this.length = length
    this.leftPos = leftPos
    this.topPos = topPos

    //define once
    this.cornerData.distance = Math.sqrt(Math.pow(width / 2, 2) + Math.pow(length / 2, 2))
    this.cornerData.degree = this.toDegrees(Math.atan(width / length))
  }
  bounceBack(yDirection:number, xDirection:number) {
    console.log('CRASH')
    this.speed = this.speed * -1
    this.updateDriftSpeed()
    this.leftPos += xDirection * 10
    this.topPos += yDirection * 10
  }
  animate() {
    this.adjustSpeedAndDirection()
    this.adjustPosition()
    this.redetermineCorners()
  }
  redetermineCorners() {
    let topLeftDegrees = this.carDirection - this.cornerData.degree
    this.cornerData.frontLeft.x = Math.sin(this.toRadians(topLeftDegrees)) * this.cornerData.distance
    this.cornerData.frontLeft.y = Math.cos(this.toRadians(topLeftDegrees)) * this.cornerData.distance

    let topRightDegrees = this.carDirection + this.cornerData.degree
    this.cornerData.frontRight.x = Math.sin(this.toRadians(topRightDegrees)) * this.cornerData.distance
    this.cornerData.frontRight.y = Math.cos(this.toRadians(topRightDegrees)) * this.cornerData.distance

    let rearLeftDegrees = this.carDirection + 180 + this.cornerData.degree
    this.cornerData.rearLeft.x = Math.sin(this.toRadians(rearLeftDegrees)) * this.cornerData.distance
    this.cornerData.rearLeft.y = Math.cos(this.toRadians(rearLeftDegrees)) * this.cornerData.distance

    let rearRightDegrees = this.carDirection + 180 - this.cornerData.degree
    this.cornerData.rearRight.x = Math.sin(this.toRadians(rearRightDegrees)) * this.cornerData.distance
    this.cornerData.rearRight.y = Math.cos(this.toRadians(rearRightDegrees)) * this.cornerData.distance
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
    return angle * (Math.PI / 180)
  }
  toDegrees (angle:number) {
    return angle / (Math.PI / 180)
  }
}
