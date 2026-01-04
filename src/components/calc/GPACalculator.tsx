'use client';

import { useState } from 'react';

export default function GPACalculator() {
  const [courses, setCourses] = useState([
    { name: '', grade: '', credits: '', gradePoints: 0 }
  ]);
  const [gpaScale, setGpaScale] = useState('4.0');
  const [results, setResults] = useState<any>(null);

  const gradeScales = {
    '4.0': {
      'A+': 4.0, 'A': 4.0, 'A-': 3.7,
      'B+': 3.3, 'B': 3.0, 'B-': 2.7,
      'C+': 2.3, 'C': 2.0, 'C-': 1.7,
      'D+': 1.3, 'D': 1.0, 'D-': 0.7,
      'F': 0.0
    },
    '5.0': {
      'A+': 5.0, 'A': 5.0, 'A-': 4.7,
      'B+': 4.3, 'B': 4.0, 'B-': 3.7,
      'C+': 3.3, 'C': 3.0, 'C-': 2.7,
      'D+': 2.3, 'D': 2.0, 'D-': 1.7,
      'F': 0.0
    }
  };

  const addCourse = () => {
    setCourses([...courses, { name: '', grade: '', credits: '', gradePoints: 0 }]);
  };

  const removeCourse = (index: number) => {
    if (courses.length > 1) {
      setCourses(courses.filter((_, i) => i !== index));
    }
  };

  const updateCourse = (index: number, field: string, value: string) => {
    const updated = courses.map((course, i) => {
      if (i === index) {
        const newCourse = { ...course, [field]: value };
        if (field === 'grade') {
          const scale = gradeScales[gpaScale as keyof typeof gradeScales];
          newCourse.gradePoints = scale[value as keyof typeof scale] || 0;
        }
        return newCourse;
      }
      return course;
    });
    setCourses(updated);
  };

  const calculateGPA = () => {
    const validCourses = courses.filter(course => 
      course.grade && course.credits && parseFloat(course.credits) > 0
    );

    if (validCourses.length === 0) return;

    const totalQualityPoints = validCourses.reduce((sum, course) => {
      return sum + (course.gradePoints * parseFloat(course.credits));
    }, 0);

    const totalCredits = validCourses.reduce((sum, course) => {
      return sum + parseFloat(course.credits);
    }, 0);

    const gpa = totalQualityPoints / totalCredits;

    // Calculate grade distribution
    const gradeDistribution = validCourses.reduce((dist, course) => {
      const grade = course.grade;
      dist[grade] = (dist[grade] || 0) + 1;
      return dist;
    }, {} as any);

    // Calculate credit distribution
    const creditDistribution = validCourses.reduce((dist, course) => {
      const credits = parseFloat(course.credits);
      if (credits >= 4) dist['4+'] = (dist['4+'] || 0) + 1;
      else if (credits >= 3) dist['3'] = (dist['3'] || 0) + 1;
      else if (credits >= 2) dist['2'] = (dist['2'] || 0) + 1;
      else dist['1'] = (dist['1'] || 0) + 1;
      return dist;
    }, {} as any);

    // Calculate what GPA would be needed for target
    const calculateNeededGPA = (targetGPA: number, additionalCredits: number) => {
      const neededQualityPoints = (targetGPA * (totalCredits + additionalCredits)) - totalQualityPoints;
      return neededQualityPoints / additionalCredits;
    };

    setResults({
      gpa,
      totalCredits,
      totalQualityPoints,
      courseCount: validCourses.length,
      gradeDistribution,
      creditDistribution,
      neededFor3_0: totalCredits > 0 ? calculateNeededGPA(3.0, 12) : null,
      neededFor3_5: totalCredits > 0 ? calculateNeededGPA(3.5, 12) : null,
      neededFor4_0: totalCredits > 0 ? calculateNeededGPA(4.0, 12) : null
    });
  };

  const getGPAColor = (gpa: number) => {
    if (gpa >= 3.7) return 'text-green-600';
    if (gpa >= 3.0) return 'text-blue-600';
    if (gpa >= 2.0) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getGPALabel = (gpa: number) => {
    if (gpa >= 3.7) return 'Excellent';
    if (gpa >= 3.0) return 'Good';
    if (gpa >= 2.0) return 'Fair';
    return 'Poor';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
          <span className="text-white text-2xl">🎓</span>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">GPA Calculator — Grade Point Average Calculator</h1>
          <p className="text-gray-600">Calculate your Grade Point Average and track academic performance</p>
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">GPA Scale</label>
        <select
          value={gpaScale}
          onChange={(e) => setGpaScale(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="4.0">4.0 Scale (Standard)</option>
          <option value="5.0">5.0 Scale (Weighted)</option>
        </select>
      </div>

      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Courses</h3>
          <button
            onClick={addCourse}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Add Course
          </button>
        </div>

        <div className="space-y-4">
          {courses.map((course, index) => (
            <div key={index} className="grid grid-cols-12 gap-3 items-end">
              <div className="col-span-12 md:col-span-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Course Name</label>
                <input
                  type="text"
                  value={course.name}
                  onChange={(e) => updateCourse(index, 'name', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Mathematics"
                />
              </div>
              <div className="col-span-6 md:col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">Grade</label>
                <select
                  value={course.grade}
                  onChange={(e) => updateCourse(index, 'grade', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Grade</option>
                  {Object.keys(gradeScales[gpaScale as keyof typeof gradeScales]).map(grade => (
                    <option key={grade} value={grade}>{grade}</option>
                  ))}
                </select>
              </div>
              <div className="col-span-6 md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Credits</label>
                <input
                  type="number"
                  step="0.5"
                  value={course.credits}
                  onChange={(e) => updateCourse(index, 'credits', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="3"
                />
              </div>
              <div className="col-span-6 md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Points</label>
                <div className="px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-center font-medium">
                  {course.gradePoints.toFixed(1)}
                </div>
              </div>
              <div className="col-span-6 md:col-span-1">
                <button
                  onClick={() => removeCourse(index)}
                  className="w-full bg-red-500 text-white px-3 py-3 rounded-lg hover:bg-red-600 transition-colors"
                  disabled={courses.length === 1}
                >
                  ×
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={calculateGPA}
        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 px-6 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
      >
        Calculate GPA
      </button>

      {results && (
        <div className="mt-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
              <div className="text-center">
                <div className={`text-3xl font-bold mb-1 ${getGPAColor(results.gpa)}`}>
                  {results.gpa.toFixed(2)}
                </div>
                <div className="text-sm text-gray-700">Current GPA</div>
                <div className={`text-xs mt-1 ${getGPAColor(results.gpa)}`}>
                  {getGPALabel(results.gpa)}
                </div>
              </div>
            </div>
            <div className="bg-green-50 rounded-xl p-6 border border-green-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-900 mb-1">
                  {results.totalCredits}
                </div>
                <div className="text-sm text-green-700">Total Credits</div>
              </div>
            </div>
            <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-900 mb-1">
                  {results.courseCount}
                </div>
                <div className="text-sm text-purple-700">Courses</div>
              </div>
            </div>
            <div className="bg-orange-50 rounded-xl p-6 border border-orange-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-900 mb-1">
                  {results.totalQualityPoints.toFixed(1)}
                </div>
                <div className="text-sm text-orange-700">Quality Points</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Grade Distribution</h3>
              <div className="space-y-2">
                {Object.entries(results.gradeDistribution).map(([grade, count]) => (
                  <div key={grade} className="flex justify-between">
                    <span className="text-gray-600">Grade {grade}</span>
                    <span className="font-medium">{count as number} course(s)</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Target GPA Calculator</h3>
              <div className="space-y-3 text-sm">
                {results.neededFor3_0 && (
                  <div>
                    <div className="flex justify-between">
                      <span>For 3.0 GPA (12 more credits):</span>
                      <span className="font-medium">
                        {results.neededFor3_0 > 4.0 ? 'Not possible' : `${results.neededFor3_0.toFixed(2)} needed`}
                      </span>
                    </div>
                  </div>
                )}
                {results.neededFor3_5 && (
                  <div>
                    <div className="flex justify-between">
                      <span>For 3.5 GPA (12 more credits):</span>
                      <span className="font-medium">
                        {results.neededFor3_5 > 4.0 ? 'Not possible' : `${results.neededFor3_5.toFixed(2)} needed`}
                      </span>
                    </div>
                  </div>
                )}
                {results.neededFor4_0 && (
                  <div>
                    <div className="flex justify-between">
                      <span>For 4.0 GPA (12 more credits):</span>
                      <span className="font-medium">
                        {results.neededFor4_0 > 4.0 ? 'Not possible' : `${results.neededFor4_0.toFixed(2)} needed`}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}