const 	mix = require('laravel-mix'),
		fs	= require('fs'), // Node.js filesystem
		p	= require('path'), // Node.js path module
		jp	= 'resources/assets/js'), // Chemin du dossier où sont les bundles JavaScript
		jpp	= 'public/js'; // Chemin du dossier public où seront compilés les bundles
		
		
for (let b of fs.readdirSync(jp)) { // Pour chaque fichier dans le dossier "jp"
	let bp  = p.join(jp, b); // Le chemin du présumé bundle est le chemin de "jp" + le nom du présumé bundle
	let bpp = p.join(jpp, b + '.js'); // Le chemin publique du présumé bundle est le chemin de "jpp" + le nom du présumé bundle suivi de .js
	
	if (fs.lstatSync(bp).isDirectory()) mix.js(bp, bpp); // Si le présumé bundle est un dossier, on compile en tant que bundle
}

mix.sass('resources/assets/sass/app.scss', 'public/css');


if (mix.inProduction()) {
	mix.version()
}