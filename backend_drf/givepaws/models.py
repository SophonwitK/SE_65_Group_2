# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class Authen(models.Model):
    authid = models.AutoField(db_column='authID', primary_key=True)  # Field name made lowercase.
    firstname = models.CharField(max_length=100)
    surename = models.CharField(max_length=100)
    dob = models.DateTimeField(db_column='DOB')  # Field name made lowercase.
    address = models.CharField(max_length=100)
    tel = models.CharField(max_length=100)
    dateauthen = models.DateTimeField(db_column='DateAuthen')  # Field name made lowercase.
    idcard = models.CharField(db_column='IDcard', max_length=100)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'authen'


class Authenimg(models.Model):
    authenimgid = models.AutoField(db_column='authenimgID', primary_key=True)  # Field name made lowercase.
    authid = models.ForeignKey(Authen, models.DO_NOTHING, db_column='authID')  # Field name made lowercase.
    emimgpath = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'authenimg'


class Card(models.Model):
    cardid = models.AutoField(db_column='cardID', primary_key=True)  # Field name made lowercase.
    memberid = models.ForeignKey('Member', models.DO_NOTHING, db_column='memberID')  # Field name made lowercase.
    topic = models.CharField(max_length=100)
    hospitalid = models.IntegerField(db_column='hospitalID')  # Field name made lowercase.
    donateacceptid = models.OneToOneField('Donateaccept', models.DO_NOTHING, db_column='donateacceptID')  # Field name made lowercase.
    description = models.CharField(max_length=10000)
    date = models.DateTimeField()
    iscomplete = models.CharField(max_length=100)
    cardstatus = models.CharField(max_length=100)
    receipttypeid = models.ForeignKey('Receipttype', models.DO_NOTHING, db_column='receipttypeID')  # Field name made lowercase.
    receiptnumber = models.CharField(max_length=100)
    receiptimgpath = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'card'


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


class Hcapprovedocument(models.Model):
    hcadid = models.AutoField(db_column='hcadID', primary_key=True)  # Field name made lowercase.
    hcid = models.ForeignKey('Hospitalcoordinator', models.DO_NOTHING, db_column='hcID')  # Field name made lowercase.
    emimgpath = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'hcapprovedocument'


class Hospital(models.Model):
    hospitalid = models.AutoField(db_column='hospitalID', primary_key=True)  # Field name made lowercase.
    name = models.CharField(max_length=100)
    email = models.CharField(max_length=100)
    address = models.CharField(max_length=100)
    tel = models.CharField(max_length=100)
    isaccept = models.CharField(max_length=100)
    field = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'hospital'


class Hospitalcoordinator(models.Model):
    hcid = models.AutoField(db_column='hcID', primary_key=True)  # Field name made lowercase.
    hospitalid = models.ForeignKey(Hospital, models.DO_NOTHING, db_column='hospitalID')  # Field name made lowercase.
    username = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    hcdocid = models.IntegerField(db_column='hcdocID', blank=True, null=True)  # Field name made lowercase.
    firstname = models.CharField(max_length=100)
    surename = models.CharField(max_length=100)
    email = models.CharField(max_length=100)
    tel = models.CharField(max_length=100)
    iscomplete = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'hospitalcoordinator'


class Imgcard(models.Model):
    imgcardid = models.AutoField(db_column='imgcardID', primary_key=True)  # Field name made lowercase.
    cardid = models.ForeignKey(Card, models.DO_NOTHING, db_column='cardID')  # Field name made lowercase.
    filepath = models.CharField(db_column='filePath', max_length=100)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'imgcard'


class Imgdonar(models.Model):
    imgdonarid = models.AutoField(db_column='imgdonarID', primary_key=True)  # Field name made lowercase.
    donarid = models.ForeignKey(Donar, models.DO_NOTHING, db_column='donarID')  # Field name made lowercase.
    filepath = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'imgdonar'


class Imgdonateaccept(models.Model):
    imgdonateacceptid = models.AutoField(db_column='imgdonateacceptID', primary_key=True)  # Field name made lowercase.
    donateacceptid = models.ForeignKey(Donateaccept, models.DO_NOTHING, db_column='donateacceptID')  # Field name made lowercase.
    filepath = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'imgdonateaccept'


class Member(models.Model):
    memberid = models.AutoField(db_column='memberID', primary_key=True)  # Field name made lowercase.
    name = models.CharField(max_length=100)
    username = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    userlevelid = models.ForeignKey('Userlevel', models.DO_NOTHING, db_column='userlevelID')  # Field name made lowercase.
    authid = models.OneToOneField(Authen, models.DO_NOTHING, db_column='authID')  # Field name made lowercase.
    email = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'member'


class Paymentcard(models.Model):
    paymentcardid = models.AutoField(db_column='paymentcardID', primary_key=True)  # Field name made lowercase.
    memberid = models.ForeignKey(Member, models.DO_NOTHING, db_column='memberID')  # Field name made lowercase.
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
    memberid = models.ForeignKey(Member, models.DO_NOTHING, db_column='memberID')  # Field name made lowercase.
    cardid = models.ForeignKey(Card, models.DO_NOTHING, db_column='cardID')  # Field name made lowercase.
    topic = models.CharField(max_length=100)
    description = models.CharField(max_length=10000)
    reportid = models.AutoField(db_column='reportID', primary_key=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'report'


class Userlevel(models.Model):
    userlevelid = models.AutoField(db_column='userlevelID', primary_key=True)  # Field name made lowercase.
    userlevelname = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'userlevel'
