import { DiscoveryModule } from '@golevelup/nestjs-discovery';
import { Module } from '@nestjs/common';
import { FibonacciJob } from './fibonacci.job';
import { JobsDiscoveryService } from './jobs-discovery.service';
import { JobsResolver } from './jobs.resolver';

@Module({
  imports: [DiscoveryModule],
  providers: [FibonacciJob, JobsDiscoveryService, JobsResolver],
})
export class JobsModule {}
