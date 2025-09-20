import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Job } from './entities/job.entity';
import { ExecuteJobInput } from './input/execute-job.input';
import { JobsDiscoveryService } from './jobs-discovery.service';

@Resolver(() => Job)
export class JobsResolver {
  constructor(private readonly jobsDiscoveryService: JobsDiscoveryService) {}

  @Query(() => [Job], { name: 'jobs' })
  getJobs() {
    return this.jobsDiscoveryService.getJobs();
  }

  @Mutation(() => Job, { name: 'executeJob' })
  executeJob(@Args('input') input: ExecuteJobInput) {
    return this.jobsDiscoveryService.executeJob(input);
  }
}
