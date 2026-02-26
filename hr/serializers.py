from rest_framework import serializers
from .models import Employee, Attendance
from django.utils.timezone import now

class EmployeeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Employee
        fields = '__all__'

    def validate_employee_id(self, value):
        value = value.strip()
        if Employee.objects.filter(employee_id=value).exists():
            raise serializers.ValidationError("Employee ID already exists.")
        return value

    def validate_email(self, value):
        if Employee.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email already exists.")
        return value



class AttendanceSerializer(serializers.ModelSerializer):
    employee_name = serializers.CharField(source='employee.full_name', read_only=True)
    employee_id = serializers.CharField(source='employee.employee_id', read_only=True)

    class Meta:
        model = Attendance
        fields = ['id', 'employee', 'employee_id', 'employee_name', 'date', 'status']

    def validate(self, data):
        employee = data.get('employee')
        date = data.get('date')

        if date > now().date():
            raise serializers.ValidationError("Attendance date cannot be in the future.")

        if Attendance.objects.filter(employee=employee, date=date).exists():
            raise serializers.ValidationError(
                "Attendance is already marked for this employee on this date."
            )

        return data

