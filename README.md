## Guide de développement de "bundling" JavaScript

Ces quelques lignes sont présentes afin d'expliquer comment le système des ressources JavaScript fonctionne
et quelles sont les règles minimales à respecter.

### Système de compilation

Les ressources de l'application possèdent un système de compilation basé sur Laravel-Mix, dont le comportement
est modifié.

- Il est à savoir que tout fichier à la racine du dossier `/resources/assets/js` ne sera pas compilé
- Un dossier ne sera compilé que s'il possède soit :
    - un fichier `index.js`
    - un fichier `package.js` dont l'entrée `main` est renseigné
- Un dossier compilé devient un `bundle` de scripts appelé de la même manière que ce dossier


Ainsi :

```
 assets/js
 |
 |─── common
 |    |  index.js
 |    |  _constants.js
 |    |  _globals.js
 |
 |─── users
 |    |  index.js
 |    |─── list
 |    |    |  index.js
 |    |─── prefs
 |    |    |  index.js
```

Sera compilé en :

```
 public/js
 |
 |  common.js
 |  users.js
```


### Conseils d'écriture

Afin de garder une certaine unicité du code, il est conseillé de suivre certaines règles d'écriture :

- L'usage de `var` est peu conseillé, il est préférable d'utiliser `let` ou `const`
- Tout import fait par `require( )` doit être stocké dans une constante
- Tout les imports (sauf imports dynamiques) doivent être en début de fichier
- Les fichiers qui sont uniquement destinés à être importés devraient commencer par `_`  (e.g.: `_consts.js`)



### Usage dans Blade

Pour faciliter l'import de bundles, il a été développé un fournisseur de service `BladeMacroProvider`,
dans le namespace `App\Providers`.

Il est nécessaire de l'inclure dans les `providers` du fichier `config/app.php` de Laravel pour l'utiliser.

Cela ajoute une macro Blade `@bundle` qui permet d'inclure un bundle par son nom de la sorte :

```blade
<head>
    <title>Mon titre</title>
    
    @bundle(common) <!-- Deviens /js/common.js -->
    @bundle(users)  <!-- Deviens /js/users.js -->
</head>
```
