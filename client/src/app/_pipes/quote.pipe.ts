import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'quote' })
export class QuotePipe implements PipeTransform {
  transform(text : string, symbol? : string): string {
    let q1 = symbol || '"';
    let q2 = q1.replace(/\(/g, ')')
               .replace(/{/g, '}')
               .replace(/\[/g, ']')
               .replace(/</g, '>');
    return `${q1}${text}${q2}`;
  } 
}

