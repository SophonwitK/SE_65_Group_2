# Generated by Django 4.1.6 on 2023-03-06 15:55

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Authen',
            fields=[
                ('authid', models.AutoField(db_column='authID', primary_key=True, serialize=False)),
                ('firstname', models.CharField(max_length=100)),
                ('surename', models.CharField(max_length=100)),
                ('dob', models.DateTimeField(db_column='DOB')),
                ('address', models.CharField(max_length=100)),
                ('tel', models.CharField(max_length=100)),
                ('dateauthen', models.DateTimeField(db_column='DateAuthen')),
                ('idcard', models.CharField(db_column='IDcard', max_length=100)),
            ],
            options={
                'db_table': 'authen',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='AuthGroup',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=150, unique=True)),
            ],
            options={
                'db_table': 'auth_group',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='AuthGroupPermissions',
            fields=[
                ('id', models.BigAutoField(primary_key=True, serialize=False)),
            ],
            options={
                'db_table': 'auth_group_permissions',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='AuthPermission',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('codename', models.CharField(max_length=100)),
            ],
            options={
                'db_table': 'auth_permission',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Card',
            fields=[
                ('cardid', models.AutoField(db_column='cardID', primary_key=True, serialize=False)),
                ('topic', models.CharField(max_length=100)),
                ('hospitalid', models.IntegerField(db_column='hospitalID')),
                ('description', models.CharField(max_length=10000)),
                ('date', models.DateTimeField()),
                ('iscomplete', models.CharField(max_length=100)),
                ('cardstatus', models.CharField(max_length=100)),
                ('receiptnumber', models.CharField(max_length=100)),
                ('receiptimgpath', models.CharField(max_length=100)),
            ],
            options={
                'db_table': 'card',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='DjangoAdminLog',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('action_time', models.DateTimeField()),
                ('object_id', models.TextField(blank=True, null=True)),
                ('object_repr', models.CharField(max_length=200)),
                ('action_flag', models.PositiveSmallIntegerField()),
                ('change_message', models.TextField()),
            ],
            options={
                'db_table': 'django_admin_log',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='DjangoContentType',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('app_label', models.CharField(max_length=100)),
                ('model', models.CharField(max_length=100)),
            ],
            options={
                'db_table': 'django_content_type',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='DjangoMigrations',
            fields=[
                ('id', models.BigAutoField(primary_key=True, serialize=False)),
                ('app', models.CharField(max_length=255)),
                ('name', models.CharField(max_length=255)),
                ('applied', models.DateTimeField()),
            ],
            options={
                'db_table': 'django_migrations',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='DjangoSession',
            fields=[
                ('session_key', models.CharField(max_length=40, primary_key=True, serialize=False)),
                ('session_data', models.TextField()),
                ('expire_date', models.DateTimeField()),
            ],
            options={
                'db_table': 'django_session',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Donar',
            fields=[
                ('donarid', models.AutoField(db_column='donarID', primary_key=True, serialize=False)),
                ('date', models.DateTimeField()),
                ('topic', models.CharField(max_length=100)),
                ('description', models.CharField(max_length=100)),
            ],
            options={
                'db_table': 'donar',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Donateaccept',
            fields=[
                ('donateacceptid', models.AutoField(db_column='donateacceptID', primary_key=True, serialize=False)),
                ('date', models.DateTimeField()),
                ('description', models.CharField(max_length=10000)),
                ('isaccept', models.CharField(max_length=100)),
            ],
            options={
                'db_table': 'donateaccept',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Donatetopic',
            fields=[
                ('donatetopicid', models.AutoField(db_column='donatetopicID', primary_key=True, serialize=False)),
                ('topic', models.CharField(max_length=100)),
                ('amount', models.FloatField()),
                ('slipfilepath', models.CharField(max_length=100)),
            ],
            options={
                'db_table': 'donatetopic',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Hcapprovedocument',
            fields=[
                ('hcadid', models.AutoField(db_column='hcadID', primary_key=True, serialize=False)),
                ('emimgpath', models.CharField(max_length=100)),
            ],
            options={
                'db_table': 'hcapprovedocument',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Hospital',
            fields=[
                ('hospitalid', models.AutoField(db_column='hospitalID', primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=100)),
                ('email', models.CharField(max_length=100)),
                ('address', models.CharField(max_length=100)),
                ('tel', models.CharField(max_length=100)),
                ('isaccept', models.CharField(max_length=100)),
                ('field', models.IntegerField()),
            ],
            options={
                'db_table': 'hospital',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Hospitalcoordinator',
            fields=[
                ('hcid', models.AutoField(db_column='hcID', primary_key=True, serialize=False)),
                ('username', models.CharField(max_length=100)),
                ('password', models.CharField(max_length=100)),
                ('hcdocid', models.IntegerField(blank=True, db_column='hcdocID', null=True)),
                ('firstname', models.CharField(max_length=100)),
                ('surename', models.CharField(max_length=100)),
                ('email', models.CharField(max_length=100)),
                ('tel', models.CharField(max_length=100)),
                ('iscomplete', models.CharField(max_length=100)),
            ],
            options={
                'db_table': 'hospitalcoordinator',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Imgcard',
            fields=[
                ('imgcardid', models.AutoField(db_column='imgcardID', primary_key=True, serialize=False)),
                ('filepath', models.CharField(db_column='filePath', max_length=100)),
            ],
            options={
                'db_table': 'imgcard',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Imgdonar',
            fields=[
                ('imgdonarid', models.AutoField(db_column='imgdonarID', primary_key=True, serialize=False)),
                ('filepath', models.CharField(max_length=100)),
            ],
            options={
                'db_table': 'imgdonar',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Imgdonateaccept',
            fields=[
                ('imgdonateacceptid', models.AutoField(db_column='imgdonateacceptID', primary_key=True, serialize=False)),
                ('filepath', models.CharField(max_length=100)),
            ],
            options={
                'db_table': 'imgdonateaccept',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Member',
            fields=[
                ('memberid', models.AutoField(db_column='memberID', primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=100)),
                ('username', models.CharField(max_length=100)),
                ('password', models.CharField(max_length=100)),
                ('email', models.CharField(max_length=100)),
            ],
            options={
                'db_table': 'member',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Paymentcard',
            fields=[
                ('paymentcardid', models.AutoField(db_column='paymentcardID', primary_key=True, serialize=False)),
                ('contribution', models.FloatField()),
                ('date', models.DateTimeField()),
                ('paymentcardimg', models.CharField(max_length=100)),
                ('iscomplete', models.CharField(max_length=100)),
            ],
            options={
                'db_table': 'paymentcard',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Receipttype',
            fields=[
                ('receipttypeid', models.AutoField(db_column='receipttypeID', primary_key=True, serialize=False)),
                ('receiptname', models.CharField(max_length=100)),
            ],
            options={
                'db_table': 'receipttype',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Report',
            fields=[
                ('topic', models.CharField(max_length=100)),
                ('description', models.CharField(max_length=10000)),
                ('reportid', models.AutoField(db_column='reportID', primary_key=True, serialize=False)),
            ],
            options={
                'db_table': 'report',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Userlevel',
            fields=[
                ('userlevelid', models.AutoField(db_column='userlevelID', primary_key=True, serialize=False)),
                ('userlevelname', models.CharField(max_length=100)),
            ],
            options={
                'db_table': 'userlevel',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='UsersUser',
            fields=[
                ('id', models.BigAutoField(primary_key=True, serialize=False)),
                ('last_login', models.DateTimeField(blank=True, null=True)),
                ('is_superuser', models.IntegerField()),
                ('first_name', models.CharField(max_length=150)),
                ('last_name', models.CharField(max_length=150)),
                ('is_staff', models.IntegerField()),
                ('is_active', models.IntegerField()),
                ('date_joined', models.DateTimeField()),
                ('name', models.CharField(max_length=255)),
                ('email', models.CharField(max_length=255, unique=True)),
                ('password', models.CharField(max_length=255)),
                ('username', models.CharField(max_length=255, unique=True)),
                ('is_employee', models.IntegerField()),
                ('is_hospitalcoordinator', models.IntegerField()),
                ('is_authen', models.IntegerField()),
            ],
            options={
                'db_table': 'users_user',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='UsersUserGroups',
            fields=[
                ('id', models.BigAutoField(primary_key=True, serialize=False)),
            ],
            options={
                'db_table': 'users_user_groups',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='UsersUserUserPermissions',
            fields=[
                ('id', models.BigAutoField(primary_key=True, serialize=False)),
            ],
            options={
                'db_table': 'users_user_user_permissions',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Authenimg',
            fields=[
                ('authenimgid', models.AutoField(db_column='authenimgID', primary_key=True, serialize=False)),
                ('image', models.ImageField(upload_to='images/')),
                ('emimgpath', models.CharField(max_length=100)),
                ('authid', models.ForeignKey(db_column='authID', on_delete=django.db.models.deletion.DO_NOTHING, related_name='authen', to='givepaws.authen')),
            ],
            options={
                'db_table': 'authenimg',
                'managed': True,
            },
        ),
    ]
