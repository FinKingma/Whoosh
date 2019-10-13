import { Car } from './car';
import { TileSet } from './tileSet';

export class Engine {
  car:Car = new Car()
  tileSet:TileSet = new TileSet()
  driving:any
  fps:number = 25

  constructor () {
    this.car.placeCar(200, 200)
    this.tileSet.generateTileSet()
  }
  play () {
    this.driving = setInterval(() => {this.car.animate()}, this.fps)
  }
}
