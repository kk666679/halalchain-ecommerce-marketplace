'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { TrendingUp, TrendingDown, Plus } from 'lucide-react';
import { mockKeywords } from '@/lib/mock-data';
import { KeywordData } from '@/types';

export function KeywordTracker() {
  const [keywords, setKeywords] = useState<KeywordData[]>(mockKeywords);
  const [newKeyword, setNewKeyword] = useState('');

  const handleAddKeyword = () => {
    if (newKeyword.trim()) {
      const keyword: KeywordData = {
        id: Date.now().toString(),
        keyword: newKeyword.trim(),
        position: 0,
        volume: 0,
        difficulty: 0,
        trend: [],
      };
      setKeywords([...keywords, keyword]);
      setNewKeyword('');
    }
  };

  const getPositionChange = (trend: number[]) => {
    if (trend.length < 2) return 0;
    const current = trend[trend.length - 1];
    const previous = trend[trend.length - 2];
    return previous - current;
  };

  const getDifficultyColor = (difficulty: number) => {
    if (difficulty <= 30) return 'bg-green-100 text-green-800';
    if (difficulty <= 50) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <div className="space-y-6">
      {/* Add Keyword */}
      <Card>
        <CardHeader>
          <CardTitle>Add New Keyword</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2">
            <Input
              placeholder="Enter keyword to track..."
              value={newKeyword}
              onChange={(e) => setNewKeyword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddKeyword()}
            />
            <Button onClick={handleAddKeyword}>
              <Plus className="h-4 w-4 mr-2" />
              Add
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Keywords Table */}
      <Card>
        <CardHeader>
          <CardTitle>Keyword Rankings</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Keyword</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Change</TableHead>
                <TableHead>Volume</TableHead>
                <TableHead>Difficulty</TableHead>
                <TableHead>Trend</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {keywords.map((keyword) => {
                const change = getPositionChange(keyword.trend);
                return (
                  <TableRow key={keyword.id}>
                    <TableCell className="font-medium">
                      {keyword.keyword}
                    </TableCell>
                    <TableCell>
                      <span className="font-semibold text-lg">
                        #{keyword.position}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        {change > 0 ? (
                          <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                        ) : change < 0 ? (
                          <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                        ) : null}
                        <span
                          className={
                            change > 0
                              ? 'text-green-600'
                              : change < 0
                              ? 'text-red-600'
                              : 'text-gray-600'
                          }
                        >
                          {change !== 0 ? Math.abs(change) : '—'}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{keyword.volume.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge className={getDifficultyColor(keyword.difficulty)}>
                        {keyword.difficulty}%
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-1">
                        {keyword.trend.slice(-5).map((pos, index) => (
                          <div
                            key={index}
                            className="w-2 h-6 bg-blue-200 rounded-sm flex items-end"
                          >
                            <div
                              className="w-full bg-blue-500 rounded-sm"
                              style={{
                                height: `${Math.max(10, 100 - pos * 10)}%`,
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
