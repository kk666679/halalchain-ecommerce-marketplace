'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ArtifactProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Artifact: React.FC<ArtifactProps> = ({
  className = '',
  children,
  ...props
}) => {
  return (
    <div
      className={`border rounded-lg shadow-sm bg-card ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ArtifactHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export const ArtifactHeader: React.FC<ArtifactHeaderProps> = ({
  className = '',
  children,
  ...props
}) => {
  return (
    <div
      className={`flex items-center justify-between p-4 border-b bg-muted/50 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ArtifactTitleProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export const ArtifactTitle: React.FC<ArtifactTitleProps> = ({
  className = '',
  children,
  ...props
}) => {
  return (
    <p
      className={`font-semibold text-lg text-card-foreground ${className}`}
      {...props}
    >
      {children}
    </p>
  );
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ArtifactDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export const ArtifactDescription: React.FC<ArtifactDescriptionProps> = ({
  className = '',
  children,
  ...props
}) => {
  return (
    <p
      className={`text-sm text-muted-foreground ${className}`}
      {...props}
    >
      {children}
    </p>
  );
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ArtifactActionsProps extends React.HTMLAttributes<HTMLDivElement> {}

export const ArtifactActions: React.FC<ArtifactActionsProps> = ({
  className = '',
  children,
  ...props
}) => {
  return (
    <div
      className={`flex items-center gap-2 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export interface ArtifactActionProps extends React.ComponentProps<typeof Button> {
  tooltip?: string;
  label?: string;
  icon?: LucideIcon;
}

export const ArtifactAction: React.FC<ArtifactActionProps> = ({
  tooltip,
  label,
  icon: Icon,
  className = '',
  children,
  ...props
}) => {
  return (
    <Button
      variant="ghost"
      size="sm"
      className={`h-8 w-8 p-0 ${className}`}
      title={tooltip}
      aria-label={label}
      {...props}
    >
      {Icon && <Icon className="h-4 w-4" />}
      {children}
    </Button>
  );
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ArtifactCloseProps extends React.ComponentProps<typeof Button> {}

export const ArtifactClose: React.FC<ArtifactCloseProps> = ({
  className = '',
  ...props
}) => {
  return (
    <Button
      variant="ghost"
      size="sm"
      className={`h-8 w-8 p-0 ${className}`}
      {...props}
    >
      ✕
    </Button>
  );
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ArtifactContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export const ArtifactContent: React.FC<ArtifactContentProps> = ({
  className = '',
  children,
  ...props
}) => {
  return (
    <div
      className={`p-4 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
