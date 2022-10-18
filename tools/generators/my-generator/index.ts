import {generateFiles, joinPathFragments, readProjectConfiguration, Tree} from '@nrwl/devkit';
import {applicationGenerator} from "@nrwl/angular/generators";
import {insertImport} from "../utils/insert-import";
import {insertNgModuleImport} from "@nrwl/angular/src/generators/utils";

interface Schema {
  name: string;
}

export default async function (tree: Tree, schema: Schema) {
  await applicationGenerator(tree, {
    name: schema.name,
    routing: true,
    prefix: schema.name,
    style: 'scss',
  });

  const sourceDir = joinPathFragments(__dirname, 'files');
  const projectDir = readProjectConfiguration(tree, schema.name).root;
  const destinationDir = joinPathFragments(projectDir, 'src', 'app');
  generateFiles(tree, sourceDir, destinationDir, {
    tpl: '',
  });

  const modulePath = joinPathFragments(projectDir, 'src', 'app', 'app.module.ts');
  insertImport(tree, modulePath, 'MyLibraryModule', '@my-workspace/my-library');
  insertNgModuleImport(tree, modulePath, 'MyLibraryModule');
}
