import { Car } from './car';
import { TileSet } from './tileSet';

export class Engine {
  car:Car = new Car()
  tileSet:TileSet = new TileSet()
  driving:any
  collission:any
  fps:number = 25
  currentTileRow:number = 0
  currentTileCell:number = 0

  constructor () {
    this.car.placeCar(40, 80, 400, 400)
  }
  play () {
    this.driving = setInterval(() => {this.car.animate()}, this.fps)
    this.collission = setInterval(() => {this.checkCollissions()}, this.fps)
  }
  carCornerOverlapsWithTile(carX:number, carY:number, tileRow:number, tileCell:number, tileSize:number) {
    return carX > tileRow * tileSize && 
    carX < (tileRow + 1) * tileSize &&
    carY > tileCell * tileSize &&
    carY < (tileCell + 1) * tileSize
  }
  checkCollissions() {
    let tileSize = this.tileSet.tileData.tileSize
    this.currentTileRow = Math.floor(this.car.topPos / tileSize)
    this.currentTileCell = Math.floor(this.car.leftPos / tileSize)
    for (let y = this.currentTileRow - 1; y <= this.currentTileRow + 1; y ++) {
      for (let x = this.currentTileCell - 1; x <= this.currentTileCell + 1; x++) {
        if (x < 0 || y < 0 || y > this.tileSet.tileData.tiles.length || x > this.tileSet.tileData.tiles[y].length) {
          continue
        }
        let tileType = this.tileSet.tileData.tiles[y][x].tileName
        if (tileType == 'building') {

          if (this.carCornerOverlapsWithTile(
            this.car.leftPos + this.car.cornerData.frontLeft.x,
            this.car.topPos + this.car.cornerData.frontLeft.y, 
            x, y, tileSize)) {
            this.car.bounceBack(this.currentTileRow - y, this.currentTileCell - x)
          }

          if (this.carCornerOverlapsWithTile(
            this.car.leftPos + this.car.cornerData.frontRight.x,
            this.car.topPos + this.car.cornerData.frontRight.y,
            x, y, tileSize)) {
            this.car.bounceBack(this.currentTileRow - y, this.currentTileCell - x)
          }

          if (this.carCornerOverlapsWithTile(
            this.car.leftPos + this.car.cornerData.rearLeft.x,
            this.car.topPos + this.car.cornerData.rearLeft.y,
            x, y, tileSize)) {
            this.car.bounceBack(this.currentTileRow - y, this.currentTileCell - x)
          }

          if (this.carCornerOverlapsWithTile(
            this.car.leftPos + this.car.cornerData.rearRight.x,
            this.car.topPos + this.car.cornerData.rearRight.y,
            x, y, tileSize)) {
            this.car.bounceBack(this.currentTileRow - y, this.currentTileCell - x)
          }
        }
      }
    }
  }
}
