export function moveArrayItemTo<T>(fromArray:T[], toArray:T[], willBeMovedElement:T) {
    const index = fromArray.indexOf(willBeMovedElement);
    const element = fromArray[index];
    fromArray.splice(index, 1);
    toArray.push(element);
  }