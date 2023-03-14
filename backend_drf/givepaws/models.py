# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models
import os

class AuthGroup(models.Model):
    name = models.CharField(unique=True, max_length=150)

    class Meta:
        managed = False
        db_table = 'auth_group'


class AuthGroupPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)
    permission = models.ForeignKey('AuthPermission', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_group_permissions'
        unique_together = (('group', 'permission'),)


class AuthPermission(models.Model):
    name = models.CharField(max_length=255)
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING)
    codename = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'auth_permission'
        unique_together = (('content_type', 'codename'),)


class Authen(models.Model):
    authid = models.AutoField(db_column='authID', primary_key=True)  # Field name made lowercase.
    firstname = models.CharField(max_length=100)
    surname = models.CharField(max_length=100)
    dob = models.DateTimeField(db_column='DOB')  # Field name made lowercase.
    address = models.CharField(max_length=1000)
    tel = models.CharField(max_length=100)
    dateauthen = models.DateTimeField(db_column='DateAuthen')  # Field name made lowercase.
    idcard = models.CharField(db_column='IDcard', max_length=100)  # Field name made lowercase.
    user = models.OneToOneField('UsersUser', models.DO_NOTHING, db_column='user', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'authen'

class Authenimage(models.Model):
    authen = models.ForeignKey(Authen, on_delete=models.CASCADE, related_name = "images")
    image = models.ImageField(upload_to="img/authen", default="", null=True, blank=True)

class AuthenCheck(models.Model):
    comment = models.CharField(max_length=1000, blank=True, null=True)
    isapprove = models.IntegerField(db_column='isApprove')  # Field name made lowercase.
    authen = models.OneToOneField(Authen, models.DO_NOTHING, db_column='authen')

    class Meta:
        managed = False
        db_table = 'authen_check'


class Card(models.Model):
    cardid = models.AutoField(db_column='cardID', primary_key=True)  # Field name made lowercase.
    topic = models.CharField(max_length=100)
    donateacceptid = models.OneToOneField('Donateaccept', models.DO_NOTHING, db_column='donateacceptID')  # Field name made lowercase.
    description = models.CharField(max_length=10000)
    date = models.DateTimeField()
    iscomplete = models.CharField(max_length=100)
    cardstatus = models.CharField(max_length=100)
    receipttypeid = models.ForeignKey('Receipttype', models.DO_NOTHING, db_column='receipttypeID')  # Field name made lowercase.
    receiptnumber = models.CharField(max_length=100)
    receiptimgpath = models.CharField(max_length=100)
    user = models.ForeignKey('UsersUser', models.DO_NOTHING, db_column='user')
    hospitalid = models.ForeignKey('Hospital', models.DO_NOTHING, db_column='hospitalID')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'card'


class DjangoAdminLog(models.Model):
    action_time = models.DateTimeField()
    object_id = models.TextField(blank=True, null=True)
    object_repr = models.CharField(max_length=200)
    action_flag = models.PositiveSmallIntegerField()
    change_message = models.TextField()
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey('UsersUser', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'django_admin_log'


class DjangoContentType(models.Model):
    app_label = models.CharField(max_length=100)
    model = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'django_content_type'
        unique_together = (('app_label', 'model'),)


class DjangoMigrations(models.Model):
    id = models.BigAutoField(primary_key=True)
    app = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    applied = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_migrations'


class DjangoSession(models.Model):
    session_key = models.CharField(primary_key=True, max_length=40)
    session_data = models.TextField()
    expire_date = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_session'


class Donar(models.Model):
    donarid = models.AutoField(db_column='donarID', primary_key=True)  # Field name made lowercase.
    date = models.DateTimeField()
    topic = models.CharField(max_length=100)
    description = models.CharField(max_length=100)
    cardid = models.ForeignKey(Card, models.DO_NOTHING, db_column='cardID')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'donar'


class Donateaccept(models.Model):
    donateacceptid = models.AutoField(db_column='donateacceptID', primary_key=True)  # Field name made lowercase.
    hospitalid = models.ForeignKey('Hospital', models.DO_NOTHING, db_column='hospitalID')  # Field name made lowercase.
    hcid = models.OneToOneField('Hospitalcoordinator', models.DO_NOTHING, db_column='hcID')  # Field name made lowercase.
    date = models.DateTimeField()
    description = models.CharField(max_length=10000)
    isaccept = models.CharField(max_length=100)
    cardid = models.OneToOneField(Card, models.DO_NOTHING, db_column='cardID')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'donateaccept'


class Donatetopic(models.Model):
    donatetopicid = models.AutoField(db_column='donatetopicID', primary_key=True)  # Field name made lowercase.
    cardid = models.ForeignKey(Card, models.DO_NOTHING, db_column='cardID')  # Field name made lowercase.
    topic = models.CharField(max_length=100)
    amount = models.FloatField()
    slipfilepath = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'donatetopic'


class GivepawsAuthenimage(models.Model):
    id = models.BigAutoField(primary_key=True)
    image = models.CharField(max_length=100, blank=True, null=True)
    authen = models.ForeignKey(Authen, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'givepaws_authenimage'


class Hospital(models.Model):
    hospitalid = models.AutoField(db_column='hospitalID', primary_key=True)  # Field name made lowercase.
    name = models.CharField(max_length=100)
    email = models.CharField(max_length=100)
    address = models.CharField(max_length=100)
    tel = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'hospital'


class Hospitalcoordinator(models.Model):
    hcid = models.AutoField(db_column='hcID', primary_key=True)  # Field name made lowercase.
    hospitalid = models.ForeignKey(Hospital, models.DO_NOTHING, db_column='hospitalID')  # Field name made lowercase.
    hcdocid = models.IntegerField(db_column='hcdocID')  # Field name made lowercase.
    firstname = models.CharField(max_length=100)
    surname = models.CharField(max_length=100)
    tel = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'hospitalcoordinator'


class Paymentcard(models.Model):
    paymentcardid = models.AutoField(db_column='paymentcardID', primary_key=True)  # Field name made lowercase.
    user = models.ForeignKey('UsersUser', models.DO_NOTHING, db_column='user')
    contribution = models.FloatField()
    date = models.DateTimeField()
    paymentcardimg = models.CharField(max_length=100)
    iscomplete = models.CharField(max_length=100)
    donatetopicid = models.ForeignKey(Donatetopic, models.DO_NOTHING, db_column='donatetopicID')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'paymentcard'


class Receipttype(models.Model):
    receipttypeid = models.AutoField(db_column='receipttypeID', primary_key=True)  # Field name made lowercase.
    receiptname = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'receipttype'


class Report(models.Model):
    memberid = models.IntegerField(db_column='memberID')  # Field name made lowercase.
    cardid = models.ForeignKey(Card, models.DO_NOTHING, db_column='cardID')  # Field name made lowercase.
    topic = models.CharField(max_length=100)
    description = models.CharField(max_length=10000)
    reportid = models.AutoField(db_column='reportID', primary_key=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'report'


class UsersUser(models.Model):
    id = models.BigAutoField(primary_key=True)
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.IntegerField()
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    is_staff = models.IntegerField()
    is_active = models.IntegerField()
    date_joined = models.DateTimeField()
    name = models.CharField(max_length=255)
    email = models.CharField(unique=True, max_length=255)
    password = models.CharField(max_length=255)
    username = models.CharField(unique=True, max_length=255)
    is_employee = models.IntegerField()
    is_hospitalcoordinator = models.IntegerField()
    is_authen = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'users_user'


class UsersUserGroups(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(UsersUser, models.DO_NOTHING)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'users_user_groups'
        unique_together = (('user', 'group'),)


class UsersUserUserPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(UsersUser, models.DO_NOTHING)
    permission = models.ForeignKey(AuthPermission, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'users_user_user_permissions'
        unique_together = (('user', 'permission'),)



