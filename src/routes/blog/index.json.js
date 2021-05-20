import grayMatter from "gray-matter";
import glob from 'glob';
import {fs} from 'mz';
import path from 'path';

async function getCollection( pattern ){
  // find all files that match the pattern
  // return file names
  return new Promise((resolve, reject) =>
      glob(`static/${pattern}`, (err, files) => {
      if (err) return reject(err);
      return resolve(files);
    }),
  );
}

function readCollection( fileslist ){
  return Promise.all(
    fileslist.map(async file => {
      const content = (await fs.readFile(file)).toString();
      // return frontmatter dataset together with slug
      return {...grayMatter(content).data, slug: path.parse(file).name};
    }),
  );
}

function sortCollection( collection, field ){
  return collection.sort((a, b) => (a[field] < b[field] ? 1 : -1));
}

export async function get(req, res) {

  const files = await getCollection('posts/*.md');
  let contents = await readCollection( files );
  contents = sortCollection( contents, 'date' );

  res.writeHead(200, {
    'Content-Type': 'application/json',
  });
  res.end(JSON.stringify(contents));
}
