import { Job } from '../../decorators/job.decorator';
import { AbstractJob } from './job.abstract';

@Job({
  id: 'fibonacci-job',
  title: 'Fibonacci Job',
  description: 'Calculates Fibonacci numbers and save in db',
})
export class FibonacciJob extends AbstractJob {}
