// src/pages/Sustainability/RecycleRewards.jsx
import { useState } from 'react';
import { Gift, Star, Trophy, Leaf, Users, Calendar, TrendingUp, Award, Zap } from 'lucide-react';

const RecycleRewards = () => {
  const [activeTab, setActiveTab] = useState('rewards');

  const rewards = [
    { id: 1, name: 'Recycling Starter', description: 'Recycle 10 kg of materials', points: 100, icon: Leaf, color: 'bg-emerald-100 text-emerald-600' },
    { id: 2, name: 'Eco Warrior', description: 'Recycle 50 kg of materials', points: 500, icon: Star, color: 'bg-blue-100 text-blue-600' },
    { id: 3, name: 'Green Champion', description: 'Recycle 100 kg of materials', points: 1000, icon: Trophy, color: 'bg-amber-100 text-amber-600' },
    { id: 4, name: 'Sustainability Hero', description: 'Recycle 500 kg of materials', points: 5000, icon: Award, color: 'bg-purple-100 text-purple-600' },
  ];

  const leaderboard = [
    { rank: 1, name: 'N. Perera', points: 2450, badge: 'Gold' },
    { rank: 2, name: 'A. Fernando', points: 2100, badge: 'Gold' },
    { rank: 3, name: 'S. Jayawardena', points: 1850, badge: 'Silver' },
    { rank: 4, name: 'M. Silva', points: 1600, badge: 'Silver' },
    { rank: 5, name: 'K. Fernando', points: 1400, badge: 'Bronze' },
  ];

  const userStats = {
    totalPoints: 1250,
    rank: 3,
    recycled: 125,
    streak: 7
  };

  return (
    <div className="workspace-content fade-in">
      <div className="page-header">
        <div>
          <div className="page-kicker">SUSTAINABILITY</div>
          <h1 className="page-title">Recycle Rewards</h1>
          <p className="page-description">Earn points for recycling and redeem rewards</p>
        </div>
      </div>

      {/* User Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="workspace-panel">
          <div className="panel-body text-center">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center mx-auto mb-2">
              <Star size={20} className="text-emerald-600" />
            </div>
            <p className="text-2xl font-bold text-slate-900">{userStats.totalPoints}</p>
            <p className="text-sm text-slate-500">Total Points</p>
          </div>
        </div>
        <div className="workspace-panel">
          <div className="panel-body text-center">
            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mx-auto mb-2">
              <Trophy size={20} className="text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-slate-900">#{userStats.rank}</p>
            <p className="text-sm text-slate-500">Your Rank</p>
          </div>
        </div>
        <div className="workspace-panel">
          <div className="panel-body text-center">
            <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mx-auto mb-2">
              <Leaf size={20} className="text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-slate-900">{userStats.recycled} kg</p>
            <p className="text-sm text-slate-500">Recycled</p>
          </div>
        </div>
        <div className="workspace-panel">
          <div className="panel-body text-center">
            <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center mx-auto mb-2">
              <Zap size={20} className="text-amber-600" />
            </div>
            <p className="text-2xl font-bold text-slate-900">{userStats.streak} days</p>
            <p className="text-sm text-slate-500">Streak</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs mb-6">
        <button className={`tab ${activeTab === 'rewards' ? 'active' : ''}`} onClick={() => setActiveTab('rewards')}>
          Rewards
        </button>
        <button className={`tab ${activeTab === 'leaderboard' ? 'active' : ''}`} onClick={() => setActiveTab('leaderboard')}>
          Leaderboard
        </button>
        <button className={`tab ${activeTab === 'history' ? 'active' : ''}`} onClick={() => setActiveTab('history')}>
          History
        </button>
      </div>

      {/* Rewards Tab */}
      {activeTab === 'rewards' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {rewards.map((reward) => {
            const Icon = reward.icon;
            const canRedeem = userStats.totalPoints >= reward.points;
            return (
              <div key={reward.id} className="rounded-2xl border border-slate-200 bg-white p-5">
                <div className="flex items-start gap-4">
                  <div className={`w-14 h-14 rounded-xl ${reward.color} flex items-center justify-center`}>
                    <Icon size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{reward.name}</h3>
                    <p className="text-sm text-slate-500">{reward.description}</p>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-lg font-bold text-emerald-600">{reward.points} pts</span>
                      <button
                        className={`btn btn-sm ${canRedeem ? 'btn-primary' : 'btn-secondary'}`}
                        disabled={!canRedeem}
                      >
                        <Gift size={14} />Redeem
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Leaderboard Tab */}
      {activeTab === 'leaderboard' && (
        <div className="workspace-panel">
          <div className="panel-body">
            <div className="space-y-3">
              {leaderboard.map((user) => (
                <div key={user.rank} className={`flex items-center justify-between p-4 rounded-xl ${
                  user.rank === 1 ? 'bg-amber-50 border border-amber-200' :
                  user.rank === 2 ? 'bg-slate-50 border border-slate-200' :
                  user.rank === 3 ? 'bg-orange-50 border border-orange-200' :
                  'bg-slate-50'
                }`}>
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                      user.rank === 1 ? 'bg-amber-100 text-amber-700' :
                      user.rank === 2 ? 'bg-slate-200 text-slate-700' :
                      user.rank === 3 ? 'bg-orange-100 text-orange-700' :
                      'bg-slate-100 text-slate-600'
                    }`}>
                      {user.rank}
                    </div>
                    <div>
                      <p className="font-semibold">{user.name}</p>
                      <p className="text-sm text-slate-500">{user.badge} Member</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-emerald-600">{user.points}</p>
                    <p className="text-sm text-slate-500">points</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* History Tab */}
      {activeTab === 'history' && (
        <div className="workspace-panel">
          <div className="panel-body">
            <div className="space-y-3">
              {[
                { date: '2024-01-15', action: 'Recycled 5 kg of plastic', points: 50 },
                { date: '2024-01-14', action: 'Recycled 3 kg of paper', points: 30 },
                { date: '2024-01-13', action: 'Recycled 2 kg of glass', points: 20 },
                { date: '2024-01-12', action: 'Reduced waste by 10%', points: 100 },
                { date: '2024-01-11', action: 'Recycled 4 kg of metal', points: 40 },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                      <Leaf size={16} className="text-emerald-600" />
                    </div>
                    <div>
                      <p className="font-semibold">{item.action}</p>
                      <p className="text-sm text-slate-500">{item.date}</p>
                    </div>
                  </div>
                  <span className="text-lg font-bold text-emerald-600">+{item.points}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecycleRewards;
