# Generated by Django 4.2 on 2023-04-13 01:31

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0002_remove_order_paymentmethod_alter_order_ispaid'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='orderitem',
            name='name',
        ),
        migrations.RemoveField(
            model_name='orderitem',
            name='price',
        ),
    ]
