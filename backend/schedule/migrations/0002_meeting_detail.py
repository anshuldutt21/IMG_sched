# Generated by Django 2.2.2 on 2019-06-14 07:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('schedule', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='meeting',
            name='detail',
            field=models.TextField(max_length=200, null=True),
        ),
    ]