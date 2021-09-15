if (frames % 100 == 0) {
        this.position.push({
          x: cvs.width,
          y: this.maxYPos * (Math.random() + 1),
        });
      }