from rest_framework.response import Response
from rest_framework import status,viewsets
from .models import Employee, Attendance
from .serializers import EmployeeSerializer, AttendanceSerializer
from rest_framework.decorators import api_view
from django.db.models import Count
from django.utils.timezone import now

class EmployeeViewSet(viewsets.ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer

class AttendanceViewSet(viewsets.ModelViewSet):
    queryset = Attendance.objects.all()
    serializer_class = AttendanceSerializer

@api_view(['GET'])
def dashboard_summary(request):
    today = now().date()
    print(f"i am pr checking only {today}")
    total_employees = Employee.objects.count()
    total_attendance = Attendance.objects.count()
    present_today = Attendance.objects.filter(date=today, status='Present').count()
    absent_today = Attendance.objects.filter(date=today, status='Absent').count()

    return Response({
        "total_employees": total_employees,
        "total_attendance": total_attendance,
        "present_today": present_today,
        "absent_today": absent_today
    })