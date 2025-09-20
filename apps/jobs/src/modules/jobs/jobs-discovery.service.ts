import { DiscoveryService } from '@golevelup/nestjs-discovery';
import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { JOB_METADATA_KEY } from '../../decorators/job.decorator';
import { JobMetadata } from '../../interfaces/job-metadata.interface';
import { Job } from './entities/job.entity';
import { ExecuteJobInput } from './input/execute-job.input';
import { AbstractJob } from './job.abstract';

@Injectable()
export class JobsDiscoveryService implements OnModuleInit {
  private jobs: { instance: AbstractJob; meta: JobMetadata }[] = [];

  constructor(private readonly discoveryService: DiscoveryService) {}

  async onModuleInit() {
    const jobProviders =
      await this.discoveryService.providersWithMetaAtKey<JobMetadata>(
        JOB_METADATA_KEY
      );

    this.jobs = jobProviders
      .filter(
        (provider) => provider.discoveredClass.instance instanceof AbstractJob
      )
      .map((d) => ({
        instance: d.discoveredClass.instance as AbstractJob,
        meta: d.meta,
      }));
  }

  async getJobs(): Promise<Job[]> {
    return this.jobs.map((j) => j.meta);
  }

  async executeJob(input: ExecuteJobInput): Promise<Job> {
    const neededJob = this.jobs.find((j) => j.meta.id === input.id);

    if (!neededJob) throw new NotFoundException('Job not found');

    await neededJob.instance.execute();

    return neededJob.meta;
  }
}
