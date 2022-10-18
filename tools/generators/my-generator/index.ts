import {Tree} from '@nrwl/devkit';
import {applicationGenerator} from "@nrwl/angular/generators";

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
}
