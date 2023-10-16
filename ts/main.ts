class Testor {
  private test: Array<number> = [1, 2, 3, 4, 5, 6];

  shuffle(): void {
    for (let i = this.test.length - 1; i > 0; i--) {
      let j: number = Math.floor(Math.random() * (i + 1));
      let temp: number = this.test[i];
      this.test[i] = this.test[j];
      this.test[j] = temp;
    }
  }

  random({
    count = 1,
    allowDupes,
  }: {
    count: number;
    allowDupes?: boolean;
  }): Array<number> {
    let selected: Array<number> = [];

    if (!allowDupes && count > this.test.length) {
      throw new Error(`Can't ensure no dupes for that count`);
    }

    for (let i: number = 0; i < count; i++) {
      if (allowDupes) {
        // Dupes are cool, so let's just pull random reptiles
        const index = getRndInteger(0, this.test.length);
        selected.push(this.test[index]);
      } else {
        // Dupes are no go, shuffle the array and grab a few
        this.shuffle();
        selected = this.test.slice(0, count);
      }
    }

    return selected;
  }
}

function getRndInteger(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const test = new Testor();
test.shuffle();
console.log(test.random({ count: 10, allowDupes: true }).join(":"));
console.log(`hello test test test ${9000 - 1234523}`);
