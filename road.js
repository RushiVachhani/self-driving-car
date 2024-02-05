export class Road {
  constructor(x, width, laneCount = constants.ROAD_DEFAULT_LANE_COUNT) {
    this.x = x;
    this.width = width;
    this.laneCount = laneCount;

    this.left = x - width / 2;
    this.right = x + width / 2;

    this.top = constants.INFINITY * -1;
    this.bottom = constants.INFINITY;
  }

  draw(ctx) {
    ctx.lineWidth = constants.ROAD_LINE_WIDTH;
    ctx.strokeStyle = constants.ROAD_LINE_COLOR;

    for (let index = 0; index <= this.laneCount; index++) {
      const x = linearInterpolate(
        this.left,
        this.right,
        index / this.laneCount
      );

      if (index > 0 && index < this.laneCount) {
        ctx.setLineDash([
          constants.ROAD_DASHED_LINE_LENGTH,
          constants.ROAD_DASHED_LINE_GAPS,
        ]);
      } else {
        ctx.setLineDash([]);
      }

      ctx.beginPath();
      ctx.moveTo(x, this.top);
      ctx.lineTo(x, this.bottom);
      ctx.stroke();
    }
  }
}
