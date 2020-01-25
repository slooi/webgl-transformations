console.log('main.js loaded')

const canvas = document.getElementById('webglCanvas')
const webglModule = createWebglModule(canvas)

let sliderValues = {
	translate: [0,0],
	rotate: 0,
	scale: [1,1],
	origin: [-15,0]
}

// webglModule.updateTransform(translate,rotate,scale,origin)
setDisplayedValues()
webglModule.updateTransform(sliderValues.translate,sliderValues.rotate,sliderValues.scale,sliderValues.origin)
webglModule.render()



function setDisplayedValues(){
	const {translate,rotate,scale,origin} = sliderValues
	document.getElementsByTagName('input')[0].value = translate[0]
	translationx.innerText = translate[0]
	document.getElementsByTagName('input')[1].value = translate[1]
	translationy.innerText = translate[1]
	document.getElementsByTagName('input')[2].value = rotate
	rotation.innerText = rotate
	document.getElementsByTagName('input')[3].value = scale[0]
	scalex.innerText = scale[0]
	document.getElementsByTagName('input')[4].value = scale[1]
	scaley.innerText = scale[1]
	document.getElementsByTagName('input')[5].value = origin[0]
	originx.innerText = origin[0]
	document.getElementsByTagName('input')[6].value = origin[1]
	originy.innerText = origin[1]
}

function sliderChange(slider){
	const value = Number(slider.value);
	switch(slider.name){
		case 'translationx':
			sliderValues.translate[0] = value
			translationx.innerText = value
			break;
		case 'translationy':
			sliderValues.translate[1] = value
			translationy.innerText = value
			break;
		case 'rotation':
			sliderValues.rotate = value
			rotation.innerText = value
			break;
		case 'scalex':
			sliderValues.scale[0] = value
			scalex.innerText = value
			break;
		case 'scaley':
			sliderValues.scale[1] = value
			scaley.innerText = value
			break;
		case 'originx':
			sliderValues.origin[0] = value
			originx.innerText = value
			break;
		case 'originy':
			sliderValues.origin[1] = value
			originy.innerText = value
			break;
	}
	
	webglModule.updateTransform(sliderValues.translate,sliderValues.rotate,sliderValues.scale,sliderValues.origin)
	webglModule.render()
	console.log(slider.value)
}


function resetValues(){
	sliderValues.translate = [0,0]
	sliderValues.rotate = 0,
	sliderValues.scale = [1,1]
	sliderValues.origin = [-15,0]

	webglModule.updateTransform(sliderValues.translate,sliderValues.rotate,sliderValues.scale,sliderValues.origin)
	webglModule.render()
	setDisplayedValues()
}