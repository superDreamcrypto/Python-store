# Generated by Django 4.2 on 2023-04-11 14:12

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0004_alter_address_user'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='address',
            options={'ordering': ('-created_at',)},
        ),
        migrations.AlterModelOptions(
            name='profile',
            options={'ordering': ('-created_at',)},
        ),
    ]