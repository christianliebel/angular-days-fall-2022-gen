import {Tree} from '@nrwl/devkit';
import {wrapAngularDevkitSchematic} from "nx/src/adapter/ngcli-adapter";
import {dasherize} from "@nrwl/workspace/src/utils/strings";

interface Schema {
  name: string;
  project: string;
}

export default async function (tree: Tree, schema: Schema) {
  const moduleSchematic = wrapAngularDevkitSchematic('@schematics/angular', 'module');
  await moduleSchematic(tree, {
    name: dasherize(schema.name),
    project: schema.project
  });
}
