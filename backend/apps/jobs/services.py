from .models import JobApplication

class JobService:
    @staticmethod
    def list_jobs(user):
        return JobApplication.objects.filter(user=user)

    @staticmethod
    def create_job(user, data):
        return JobApplication.objects.create(user=user, **data)

    @staticmethod
    def update_job(instance, data):
        for key, value in data.items():
            setattr(instance, key, value)
        instance.save()
        return instance

    @staticmethod
    def delete_job(instance):
        instance.delete()
