# DKT: Condones Trust

Proyecto de optimización del sitio web estático de Condones Trust. ~~Creado originalmente por palmera.marketing sin framework ni mejores prácticas.~~

Utilizando [Astro](https://astro.build/) podemos mantener el funcionamiento original del sitio estático mediante SSG, y aplicar metodlogías DRY, SOLID, templates, modulos, componentes, etc… y facilitar las actualizaciones.

## 🚀 Estructura del proyecto

```text
/
├── public/
│   └── favicons
├── src/
│   ├── components/
│   │   └── Header.astro
│   │   └── Footer.astro
│   │   └── home/
│   │       └── subsecciones de Home
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/
│       └── index.astro
└── package.json
```
Para saber más sobre la estructura de directorios de un projecto en Astro, ir a [Astro guide on project structure](https://docs.astro.build/en/basics/project-structure/).

## 📜:scroll: Notas importantes

He omitido del repositorio los archivos PNG JPG que tenian un peso considerable, ~~porque No estaban optimizados~~, utilizando .gitignore

## 🧞 Comandos

Todos los comandos deben ejecutarse desde la raíz del proyecto, desde una terminal/consola:

| Comando                   | Acción                                                |
| :------------------------ | :---------------------------------------------------- |
| `npm install`             | Instalar dependencias                                 |
| `npm run dev`             | Inicia servidor local dev en `localhost:4321`         |
| `npm run build`           | Compila el sitio de producción a `./dist/`            |
| `npm run preview`         | Previsualiza la build localmente antes de pubicar     |
| `npm run astro ...`       | Ejecutar comandos CLI como `astro add`, `astro check` |
| `npm run astro -- --help` | Obtener ayuda usando Astro CLI                        |


♠️:spades: