# Generated by Django 3.1.4 on 2021-03-13 14:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('application', '0001_initial'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='MontitorData',
            new_name='MonitorData',
        ),
        migrations.AlterField(
            model_name='project',
            name='description',
            field=models.CharField(blank=True, default='', max_length=150),
        ),
        migrations.AlterField(
            model_name='project',
            name='workspace',
            field=models.CharField(blank=True, default='', max_length=2048),
        ),
    ]