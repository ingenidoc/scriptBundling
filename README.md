# scriptBundling

Permet d'éclater les scripts Laravel en bundles importables

Comporte plusieurs fichiers à gérer :
 - webpack.mix.js : Pour que laravel-mix intègre la logique de "bundling"
 - BladeMacroProvider : Service Provider pour Laravel afin d'avoir la macro @bundle
