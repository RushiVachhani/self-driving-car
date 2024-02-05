export class Road {
  constructor(x, width, laneCount = constants.ROAD_DEFAULT_LANE_COUNT) {
    this.x = x;
    this.width = width;
    this.laneCount = laneCount;

    this.left = x - width / 2;
    this.right = x + width / 2;

    this.top = constants.INFINITY * -1;
    this.bottom = constants.INFINITY;

    const topLeft = { x: this.left, y: this.top };
    const bottomLeft = { x: this.left, y: this.bottom };
    const topRight = { x: this.right, y: this.top };
    const bottomRight = { x: this.right, y: this.bottom };
    this.borders = [
      [topLeft, bottomLeft],
      [topRight, bottomRight],
    ];
  }

  getLaneCenter(laneIndex) {
    const laneWidth = this.width / this.laneCount;
    return (
      this.left +
      laneWidth / 2 +
      Math.min(laneIndex, this.laneCount - 1) * laneWidth
    );
  }

  draw(ctx) {
    ctx.lineWidth = constants.ROAD_LINE_WIDTH;
    ctx.strokeStyle = constants.ROAD_LINE_COLOR;

    for (let index = 1; index <= this.laneCount - 1; index++) {
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
      }
      ctx.beginPath();
      ctx.moveTo(x, this.top);
      ctx.lineTo(x, this.bottom);
      ctx.stroke();
    }

    ctx.setLineDash([]);
    this.borders.forEach((border) => {
      ctx.beginPath();
      ctx.moveTo(border[0].x, border[0].y);
      ctx.lineTo(border[1].x, border[1].y);
      ctx.stroke();
    });
  }
}
