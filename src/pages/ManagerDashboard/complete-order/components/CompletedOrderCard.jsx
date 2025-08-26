import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, Calendar, User, ArrowRight } from 'lucide-react';

const CompletedOrderCard = ({ order, onViewDetails }) => {
    return (
        <Card className="hover:shadow-md transition-shadow duration-200">
            <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <h3 className="font-semibold text-gray-900">{order.id}</h3>
                    </div>
                    <Badge
                        variant={order.priority === 'Urgent' ? 'destructive' : 'secondary'}
                        className={order.priority === 'Urgent' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}
                    >
                        {order.priority}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent className="space-y-3">
                <div>
                    <h4 className="font-medium text-gray-900 mb-1">{order.title}</h4>
                    <p className="text-sm text-gray-600">{order.description}</p>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>{order.completedDate}</span>
                        </div>
                        {order.completedBy && (
                            <div className="flex items-center space-x-1">
                                <User className="h-4 w-4" />
                                <span>{order.completedBy}</span>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                    <Badge variant="outline" className="text-xs">
                        {order.category}
                    </Badge>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onViewDetails(order.id)}
                        className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                    >
                        View Details
                        <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default CompletedOrderCard;
