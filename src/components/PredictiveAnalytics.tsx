import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { calculateOptimalOperation } from '../lib/turbine-service';

const PredictiveAnalytics: React.FC = () => {
  const [selectedMetric, setSelectedMetric] = useState<'failure' | 'performance' | 'weather'>('failure');

  // Mock failure prediction data
  const failurePredictionData = [
    { component: 'Gearbox', probability: 15, timeToFailure: 45, severity: 'high' },
    { component: 'Generator', probability: 8, timeToFailure: 120, severity: 'medium' },
    { component: 'Blades', probability: 22, timeToFailure: 30, severity: 'high' },
    { component: 'Hydraulics', probability: 12, timeToFailure: 60, severity: 'low' },
    { component: 'Control System', probability: 5, timeToFailure: 180, severity: 'medium' },
    { component: 'Bearings', probability: 18, timeToFailure: 40, severity: 'high' }
  ];

  // Performance optimization data
  const performanceData = Array.from({ length: 24 }, (_, i) => {
    const windSpeed = 8 + Math.sin(i / 24 * Math.PI * 2) * 4 + Math.random() * 2;
    const optimal = calculateOptimalOperation(windSpeed, 180);
    return {
      hour: i,
      windSpeed,
      actualPower: optimal.recommendedPower * 0.9 + Math.random() * 10,
      optimalPower: optimal.recommendedPower,
      efficiency: 85 + Math.random() * 10
    };
  });

  // Weather impact analysis
  const weatherImpactData = [
    { condition: 'Wind Speed', impact: 85, optimal: 12, current: 10.5 },
    { condition: 'Temperature', impact: 92, optimal: 15, current: 18 },
    { condition: 'Humidity', impact: 78, optimal: 60, current: 75 },
    { condition: 'Air Pressure', impact: 88, optimal: 1013, current: 1008 },
    { condition: 'Turbulence', impact: 72, optimal: 0.1, current: 0.3 },
    { condition: 'Wind Direction', impact: 95, optimal: 270, current: 265 }
  ];

  // ML model confidence scores
  const modelConfidence = [
    { model: 'Failure Prediction', accuracy: 92.5, dataPoints: 150000 },
    { model: 'Power Optimization', accuracy: 88.3, dataPoints: 200000 },
    { model: 'Weather Forecasting', accuracy: 85.7, dataPoints: 500000 },
    { model: 'Maintenance Timing', accuracy: 90.2, dataPoints: 75000 }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-orange-600 bg-orange-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      {/* Metric Selector */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex space-x-4">
          <button
            onClick={() => setSelectedMetric('failure')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              selectedMetric === 'failure' 
                ? 'bg-primary-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Failure Predictions
          </button>
          <button
            onClick={() => setSelectedMetric('performance')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              selectedMetric === 'performance' 
                ? 'bg-primary-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Performance Optimization
          </button>
          <button
            onClick={() => setSelectedMetric('weather')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              selectedMetric === 'weather' 
                ? 'bg-primary-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Weather Impact
          </button>
        </div>
      </div>

      {/* Failure Predictions */}
      {selectedMetric === 'failure' && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">Component Failure Risk</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={failurePredictionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="component" angle={-45} textAnchor="end" height={80} />
                  <YAxis label={{ value: 'Failure Probability (%)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Bar dataKey="probability" fill="#ff6b6b" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">Critical Components</h3>
              <div className="space-y-3">
                {failurePredictionData
                  .sort((a, b) => b.probability - a.probability)
                  .slice(0, 4)
                  .map((item) => (
                    <div key={item.component} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{item.component}</h4>
                          <p className="text-sm text-gray-600 mt-1">
                            Failure in ~{item.timeToFailure} days
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-red-600">{item.probability}%</p>
                          <span className={`text-xs px-2 py-1 rounded ${getSeverityColor(item.severity)}`}>
                            {item.severity} risk
                          </span>
                        </div>
                      </div>
                      <div className="mt-3">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-red-600 h-2 rounded-full"
                            style={{ width: `${item.probability}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Recommended Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border-l-4 border-red-500 pl-4">
                <h4 className="font-medium text-red-600">Immediate Action</h4>
                <p className="text-sm mt-1">Schedule blade inspection for WT001, WT003</p>
                <p className="text-xs text-gray-500 mt-2">Risk reduction: 15%</p>
              </div>
              <div className="border-l-4 border-orange-500 pl-4">
                <h4 className="font-medium text-orange-600">This Week</h4>
                <p className="text-sm mt-1">Replace gearbox oil in offshore turbines</p>
                <p className="text-xs text-gray-500 mt-2">Risk reduction: 8%</p>
              </div>
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-medium text-blue-600">This Month</h4>
                <p className="text-sm mt-1">Preventive bearing maintenance cycle</p>
                <p className="text-xs text-gray-500 mt-2">Risk reduction: 12%</p>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Performance Optimization */}
      {selectedMetric === 'performance' && (
        <>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Power Output Optimization (24h)</h3>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" label={{ value: 'Hour', position: 'insideBottom', offset: -5 }} />
                <YAxis label={{ value: 'Power Output (%)', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="actualPower" stroke="#8884d8" name="Actual Power" strokeWidth={2} />
                <Line type="monotone" dataKey="optimalPower" stroke="#82ca9d" name="Optimal Power" strokeWidth={2} strokeDasharray="5 5" />
                <Line type="monotone" dataKey="windSpeed" stroke="#ffc658" name="Wind Speed (m/s)" yAxisId="right" />
                <YAxis yAxisId="right" orientation="right" label={{ value: 'Wind Speed (m/s)', angle: 90, position: 'insideRight' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">Optimization Potential</h3>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary-600">+12.5%</div>
                <p className="text-gray-600 mt-2">Additional power possible</p>
                <p className="text-sm text-gray-500 mt-4">
                  Equivalent to 5.2 MW across fleet
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">Top Improvements</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Pitch angle optimization</span>
                  <span className="text-sm font-semibold text-green-600">+4.2%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Yaw alignment</span>
                  <span className="text-sm font-semibold text-green-600">+3.8%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Power curve tuning</span>
                  <span className="text-sm font-semibold text-green-600">+2.9%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Wake effect mitigation</span>
                  <span className="text-sm font-semibold text-green-600">+1.6%</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">Financial Impact</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Daily Revenue Increase</p>
                  <p className="text-2xl font-bold text-success-600">€12,450</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Annual Projection</p>
                  <p className="text-2xl font-bold text-success-600">€4.5M</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Weather Impact */}
      {selectedMetric === 'weather' && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">Weather Impact Analysis</h3>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={weatherImpactData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="condition" />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} />
                  <Radar name="Impact Score" dataKey="impact" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">Current Conditions Impact</h3>
              <div className="space-y-4">
                {weatherImpactData.map((item) => (
                  <div key={item.condition}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">{item.condition}</span>
                      <span className="text-sm">{item.impact}% efficiency</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${item.impact > 80 ? 'bg-green-500' : item.impact > 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
                        style={{ width: `${item.impact}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Current: {item.current} | Optimal: {item.optimal}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">48-Hour Weather Optimization</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center p-4 border rounded-lg">
                <p className="text-sm text-gray-600">Next 6 Hours</p>
                <p className="text-2xl font-bold text-green-600">Optimal</p>
                <p className="text-sm mt-2">Full capacity operation</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <p className="text-sm text-gray-600">6-12 Hours</p>
                <p className="text-2xl font-bold text-yellow-600">Caution</p>
                <p className="text-sm mt-2">High wind expected</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <p className="text-sm text-gray-600">12-24 Hours</p>
                <p className="text-2xl font-bold text-green-600">Good</p>
                <p className="text-sm mt-2">Steady conditions</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <p className="text-sm text-gray-600">24-48 Hours</p>
                <p className="text-2xl font-bold text-blue-600">Variable</p>
                <p className="text-sm mt-2">Storm system possible</p>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Model Confidence */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">AI Model Performance</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {modelConfidence.map((model) => (
            <div key={model.model} className="bg-white rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-600">{model.model}</h4>
              <p className="text-2xl font-bold mt-1">{model.accuracy}%</p>
              <p className="text-xs text-gray-500 mt-2">
                {(model.dataPoints / 1000).toFixed(0)}k training samples
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PredictiveAnalytics;