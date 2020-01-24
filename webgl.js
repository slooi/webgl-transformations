console.log('webgl.js loaded')

// Shaders
// vsSource
const vsSource = document.getElementById('vsSource').innerText
// fsSource
const fsSource = document.getElementById('fsSource').innerText


// Canvas
const canvas = document.createElement('canvas')
canvas.width = 300
canvas.height = 300
document.body.append(canvas)

// gl
let gl = canvas.getContext('webgl')
if(!gl)
	console.alert('webgl not found. Fallback to experimental-webgl')
	gl = canvas.getContext('experimental-webgl')
if(!gl)
	alert('ERROR: all versions of webgl are not supported. Please use an updated browser which supports webgl');

// viewport && clearColor && clear
gl.viewport(0,0,canvas.width,canvas.height)
gl.clearColor(0.1,0.0,0.1,1.0)
gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

// Program
const program = buildProgram()
gl.useProgram(program)

// Locations
// Attributes
const attribLocations = []
for (let i=0;i<gl.getProgramParameter(program,gl.ACTIVE_ATTRIBUTES);i++){
	const attribName = gl.getActiveAttrib(program,i).name
	attribLocations[attribName] = gl.getAttribLocation(program,attribName)
}

// Uniforms
const uniformLocations = []
for(let i=0;i<gl.getProgramParameter(program,gl.ACTIVE_UNIFORMS);i++){
	const uniformName = gl.getActiveUniform(program,i).name
	uniformLocations[uniformName] = gl.getUniformLocation(program,uniformName)
}

// Data
const vertexData = [
// X	Y		R 	G		B
	0,	0,	0,	0,	1,		// 0
	30,	0,	0,	1,	0,		// 1
	30,	60,	1,	0,	0,		// 2
	
	60,	60,	0,	1,	0,		// 3
	60,	90,	1,	0,	0,		// 4
	30,	90,	1,	0,	0,		// 5
	
	30,		120,	0,		1,		0,		// 6
	60,		120,		1,		0,		0,		// 7
	60,		150,		1,		0,		0,		// 8

	0,		150,		1,		0,		0		// 9
]
const indexData = [
	// "F" trunk + top horizontal line
	0,1,2,
	0,2,9,
	2,5,9,
	5,6,9,
	6,8,9,
	6,7,8,

	// bottom horizontal line
	2, 3, 4,
	2, 4, 5,
]


// Buffer
// Vertex
const vertexDataBuffer = gl.createBuffer()
gl.bindBuffer(gl.ARRAY_BUFFER,vertexDataBuffer)
gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(vertexData),gl.STATIC_DRAW)

// Index
const indexDataBuffer = gl.createBuffer()
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,indexDataBuffer)
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint16Array(indexData),gl.STATIC_DRAW)

// Position
gl.vertexAttribPointer(
	attribLocations.a_Position,
	2,
	gl.FLOAT,
	0,
	5*4,
	0*4
)
gl.enableVertexAttribArray(attribLocations.a_Position)

// Color
gl.vertexAttribPointer(
	attribLocations.a_Color,
	3,
	gl.FLOAT,
	0,
	5*4,
	2*4
)
gl.enableVertexAttribArray(attribLocations.a_Color)





// Render
// gl.drawArrays(gl.POINTS,0,vertexData.length/5)
// gl.drawArrays(gl.TRIANGLES,0,vertexData.length/5)

gl.drawElements(gl.TRIANGLES,indexData.length,gl.UNSIGNED_SHORT,0)


// FUNCTIONS
function buildShader(type,source){
	const shader = gl.createShader(type)
	gl.shaderSource(shader,source)
	gl.compileShader(shader)

	// Check
	if(!gl.getShaderParameter(shader,gl.COMPILE_STATUS))
		throw new Error('ERROR: compiling shader type '+type+' Info: '+gl.getShaderInfoLog(shader))
	return shader
}

function buildProgram(){
	const program = gl.createProgram()
	gl.attachShader(program,buildShader(gl.VERTEX_SHADER,vsSource))
	gl.attachShader(program,buildShader(gl.FRAGMENT_SHADER,fsSource))
	gl.linkProgram(program)
	gl.validateProgram(program)

	if(!gl.getProgramParameter(program,gl.LINK_STATUS))
		throw new Error('ERROR: linking program. Info: '+gl.getProgramInfoLog(program))
	if(!gl.getProgramParameter(program,gl.VALIDATE_STATUS))
		throw new Error('ERROR: validating program. Info: '+gl.getProgramInfoLog(program))

	return program
}



















