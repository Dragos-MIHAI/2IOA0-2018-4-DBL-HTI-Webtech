let input = ';Marco;Lucas;Dragos;Marco;1;0.6947;0.3967;Lucas;0.6947;1;0.2850;Dragos;0.3967;0.2850;1';
input = input.slice(1,input.length);
let items = input.split(';');
console.log(items);

let vertices = [];
vertices.push(items[0]);
let index = 1;
while (items[index] != vertices[0]) {
    vertices.push(items[index]);
    index++;
}
index++;
console.log(vertices);

let matrix = [];
let row = [];
for (let i = 1; i < vertices.length; i++) {
    row = [];
    while (items[index] != items[i]) {
        row.push(items[index]);
        index++;
    }
    matrix.push(row);
    index++;
}
row = [];
while (index < items.length) {
    row.push(items[index]);
    index++;
}
matrix.push(row)
console.log(JSON.stringify(matrix));
