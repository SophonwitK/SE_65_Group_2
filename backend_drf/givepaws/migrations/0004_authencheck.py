# Generated by Django 4.1.6 on 2023-03-11 18:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('givepaws', '0003_djangoadminlog_djangosession_givepawsauthenimage_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='AuthenCheck',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('comment', models.CharField(max_length=1000)),
                ('status', models.IntegerField()),
            ],
            options={
                'db_table': 'authen_check',
                'managed': False,
            },
        ),
    ]
