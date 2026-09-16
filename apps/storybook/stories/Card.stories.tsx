import type { Meta, StoryObj } from '@storybook/react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Button,
} from '@acme/ui';

const meta: Meta<typeof Card> = {
  title: 'Foundations/Card',
  component: Card,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card content with some text and information.</p>
      </CardContent>
      <CardFooter>
        <Button>Action</Button>
      </CardFooter>
    </Card>
  ),
};

export const Simple: Story = {
  render: () => (
    <Card className="w-[350px] p-6">
      <p>Simple card with just content.</p>
    </Card>
  ),
};

export const WithImage: Story = {
  render: () => (
    <Card className="w-[350px] overflow-hidden">
      <div className="h-48 bg-muted" />
      <CardHeader>
        <CardTitle>Featured Card</CardTitle>
        <CardDescription>A card with an image placeholder.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          This card has an image area at the top.
        </p>
      </CardContent>
    </Card>
  ),
};

export const Interactive: Story = {
  render: () => (
    <Card className="w-[350px] hover:shadow-md transition-shadow cursor-pointer">
      <CardHeader>
        <CardTitle>Hover Me</CardTitle>
        <CardDescription>This card has hover effects.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Interactive cards are great for clickable content.</p>
      </CardContent>
    </Card>
  ),
};
