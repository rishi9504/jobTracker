from .models import JobApplication

class JobService:
    @staticmethod
    def create_job(user, job_data):
        job = JobApplication.objects.create(user=user, **job_data)
        return job

    @staticmethod
    def update_job(job, job_data):
        for key, value in job_data.items():
            setattr(job, key, value)
        job.save()
        return job

    @staticmethod
    def delete_job(job):
        job.delete()

    @staticmethod
    def list_jobs(user):
        return JobApplication.objects.filter(user=user)
