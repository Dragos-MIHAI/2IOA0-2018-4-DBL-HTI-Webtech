let input = ';Marco;Lucas;Dragos;Marco;0;0;0.3967;Lucas;0;0;0.2850;Dragos;0.3967;0.2850;0';
input = input.slice(1,input.length);
let items = input.split(';');
// console.log(items);

let vertices = []; // The JSON object as {"id": 'vertexName'}
let verticesNames = []; // We want to be able to get the vertexName by means of its index
let verticesIndex = {}; // We will use this later to not have to search for each index separately. This will make the running time shorter
let vertex = "";
let links = [];
let dict = {} // An object as {'vertexName' : frequency}
let frequencies = [] // The order of vertices by frequency
let frequencyMatrixColumns = [] // The matrix with columns AND rows ordered by frequency

function createData() { // In this function, we get the vertices, their names and their indexes. We then create a JSON file in which the links are per vertex ordered by name
    let dictionaryWord = {}; // This object keeps getting added to vertices as {"id": 'vertexName'}, as a JSON file
    dictionaryWord = {"id": items[0]} // This will be the object we keep adding first to vertices, then with a slight change to links
    vertices.push(dictionaryWord);
    verticesNames.push(items[0]);
    verticesIndex[items[0]] = 0;
    let index = 1; // This was necessary because our loop invariant wouldn't hold, since the first item, items[0], obviously equals items[0]
    while (items[index] != items[0]) {
        dictionaryWord = {"id": items[index]};
        vertices.push(dictionaryWord);
        verticesNames.push(items[index]);
        verticesIndex[items[index]] = index;
        index++;
    }
    console.log(JSON.stringify(vertices)); // Uncomment for debugging

    vertex = items[index]; // Will contain the name of the source vertex of the links untill we went past all its adjacent vertices
    index++;
    while (index < items.length) {
        for (let i = 0; i < vertices.length; i++) {
            if (items[index] != 0) { // Checks if the weight is not 0 so that there is actually an edge
                dictionaryWord = {"source": vertex, "target": verticesNames[i], "value": items[index]}; // JSON file for links, containing source, target (from, to) and value (weight)
                links.push(dictionaryWord);
            }
            index++;
        }
        vertex = items[index]; // After vertices.length steps, we checked all possible adjacent vertices and thus we can take the next vertex, which is now at items[index]
        index++;
    }
    console.log(JSON.stringify(links)); // Uncomment for debugging
}

createData();

let matrix = [];

function getFrequency() { // This function counts the amount of adjacent vertices per vertex and creates a matrix
    let row = []; // Is added to the matrix as a new row when finished 
    let index = verticesNames.length + 1; // Iterator over the whole vertices array
    for (let i = 1; i < vertices.length; i++) { // We count the links for every vertex, so we iterate over the verticesNames array
        row = [];
        dict[verticesNames[i - 1]] = 0; // Gotta start at 0
        while (items[index] != items[i]) {
            row.push(items[index]); // In the meantime, we also create a 2d array, also known as an adjacency matrix
            if (items[index] != 0) {
                dict[verticesNames[i - 1]]++; // If there is a weight, frequency is increased by 1 for that vertex
            }
            index++;
        }
        matrix.push(row);
        index++;
    }
    row = []; // The code below here is added because we keep checking the vertex in advance, but there is no next vertex for the last vertex. Therefore, this is taken out of the loop, since the loop invariant wouldn't hold
    dict[verticesNames[verticesNames.length - 1]] = 0;
    while (index < items.length) {
        row.push(items[index]);
        if (items[index] != 0) {
            dict[verticesNames[verticesNames.length - 1]]++;
        }
        index++;
    }
    matrix.push(row);

    frequencies = sortVertices(verticesNames); // Here we order the vertices by frequency by using mergesort in the form index: 'vertexName'
    frequencyMatrixRows = matrix.slice(0, matrix.length); // We first have to order the rows. Columns remain in the old order

    for (let i = 0; i < frequencies.length; i++) {
        frequencyMatrixRows[i] = matrix[verticesIndex[frequencies[i]]];
    }
    frequencyMatrixColumns = frequencyMatrixRows.map(row => [...row]); // Now we order the columns accordingly
    for (let i = 0; i < frequencies.length; i++) {
        for (let j = 0; j < frequencyMatrixRows.length; j++) {
            frequencyMatrixColumns[j][i] = frequencyMatrixRows[j][verticesIndex[frequencies[i]]] // Add the nth frequency to the frequencyMatrix by accessing the old index of that vertex
        }
        verticesIndex[frequencies[i]] = i // Then update this vertex to its new vertex, i
    }
}

getFrequency()

// This code splits the array and calls mergesort on the 2 subarrays of equal length. Specialized for the frequency.
function sortVertices(names) {
    if (names.length === 1) {
        return names;
    } else {
        const middle = Math.floor(names.length/2);
        const left = names.slice(0, middle);
        const right = names.slice(middle);

        return(merge(
            sortVertices(left), // recurseLeft()
            sortVertices(right) // recurseRight()
        ))
    }
}

// The mergesort algorithm, called upon by sortVertices. This is specialised for frequency. 
function merge(left, right) {
    let result = [];
    let indexLeft = 0
    let indexRight = 0
    while (indexLeft < left.length && indexRight < right.length) { // We iterate over both arrays and keep comparing the 2 elements untill all elements have been checked of one array. 
        if (dict[left[indexLeft]] > dict[right[indexRight]]) { // If the element in the left is bigger, we push that and take the left array's next element
            result.push(left[indexLeft])
            indexLeft++
        } else { // Else we push the element of the right array and take its next element
            result.push(right[indexRight])
            indexRight++
        }
    }
    return(result.concat(left.slice(indexLeft)).concat(right.slice(indexRight))); // We have to connect the leftovers
}

console.log(JSON.stringify(dict));
console.log(JSON.stringify(frequencies));
console.log(JSON.stringify(frequencyMatrixColumns));
