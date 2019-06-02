export function mirrorMatrixHorizontally<T>(originalMatrix: T[][]): T[][] {
    const original: T[][] = shallowCopyMatrix(originalMatrix);
    const mirroredMatrix: T[][] = [];

    original.forEach((row: T[]) => {
        mirroredMatrix.push(row.reverse());
    });

    return mirroredMatrix;
}

export function mirrorMatrixVertically<T>(originalMatrix: T[][]): T[][] {
    const original: T[][] = shallowCopyMatrix(originalMatrix);
    return original.reverse();
}

export function shallowCopyMatrix<T>(matrix: T[][]): T[][] {
    return matrix.map((row: T[]) => row.slice());
}
