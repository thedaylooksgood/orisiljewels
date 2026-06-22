'use client';

import React, { useState } from 'react';
import type { Product } from '@/lib/products';
import { Star, ThumbsUp, ThumbsDown, ChevronDown } from 'lucide-react';
import { StarRatingInput } from './StarRatingInput';

// Review data
interface Review {
  id: number;
  name: string;
  avatar: string;
  date: string;
  rating: number;
  text: string;
  likes: number;
  dislikes: number;
}

const INITIAL_REVIEWS: Review[] = [
  {
    id: 1,
    name: 'Priya Sharma',
    avatar: 'PS',
    date: 'Yesterday',
    rating: 5,
    text: 'Beautiful piece of jewelry! The silver quality is exceptional and it looks exactly like the photos. Very happy with my purchase.',
    likes: 44,
    dislikes: 0,
  },
  {
    id: 2,
    name: 'Ananya Reddy',
    avatar: 'AR',
    date: '2 days ago',
    rating: 5,
    text: 'Excellent craftsmanship. The detailing is stunning and the hallmark certification gives confidence in quality.',
    likes: 30,
    dislikes: 0,
  },
  {
    id: 3,
    name: 'Meera Patel',
    avatar: 'MP',
    date: '4 days ago',
    rating: 4,
    text: 'Good quality silver jewelry. Perfect for daily wear and special occasions.',
    likes: 25,
    dislikes: 0,
  },
];

interface Props {
  product: Product;
}

export function ReviewSection({ product }: Props) {
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [sortBy, setSortBy] = useState('newest');
  
  // Review form state
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formRating, setFormRating] = useState(5);
  const [formTitle, setFormTitle] = useState('');
  const [formText, setFormText] = useState('');

  const overallRating = 4.8;
  const totalReviews = ((product.id * 17) % 120) + 30; // Deterministic review count

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formEmail || !formText) return;
    
    const newReview: Review = {
      id: reviews.length + 1,
      name: formName,
      avatar: formName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2),
      date: 'Just now',
      rating: formRating,
      text: formText,
      likes: 0,
      dislikes: 0,
    };
    setReviews([newReview, ...reviews]);
    setFormName('');
    setFormEmail('');
    setFormRating(5);
    setFormTitle('');
    setFormText('');
  };

  return (
    <div className="text-left">
      {/* Top Row: "Review List" heading + Sort */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-lg font-bold text-[#333333]">Review List</h3>
          <p className="text-xs text-[#9E9E9E]">
            Showing 1-{reviews.length} of {totalReviews} results
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-[#9E9E9E]">Sort by:</span>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-white border border-[rgba(224,180,184,0.3)] 
                rounded-lg py-2 pl-4 pr-8 text-sm text-[#333333] cursor-pointer 
                focus:outline-none focus:border-[#C17F78]"
            >
              <option value="newest">Newest</option>
              <option value="highest">Highest Rated</option>
              <option value="lowest">Lowest Rated</option>
            </select>
            <ChevronDown size={14} className="absolute right-2 top-1/2 
              -translate-y-1/2 pointer-events-none text-[#9E9E9E]" />
          </div>
        </div>
      </div>

      {/* Two Column Layout: Reviews List (left) + Rating Summary (right) */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
        
        {/* Left: Individual Reviews */}
        <div className="space-y-6">
          {reviews.map(review => (
            <div key={review.id} className="flex gap-4">
              {/* Avatar Circle */}
              <div className="w-10 h-10 rounded-full bg-[#F3E3E4] flex items-center 
                justify-center text-sm font-bold text-[#6D4C4E] flex-shrink-0">
                {review.avatar}
              </div>
              
              <div className="flex-1">
                {/* Name + Date */}
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-sm text-[#333333]">
                    {review.name}
                  </span>
                  <span className="text-xs text-[#9E9E9E]">{review.date}</span>
                </div>
                
                {/* Stars */}
                <div className="flex items-center gap-0.5 mb-2">
                  {[1, 2, 3, 4, 5].map(star => (
                    <Star
                      key={star}
                      size={12}
                      className={star <= review.rating 
                        ? 'fill-[#F5A623] text-[#F5A623]' 
                        : 'fill-[#E0E0E0] text-[#E0E0E0]'}
                    />
                  ))}
                </div>
                
                {/* Review Text */}
                <p className="text-sm text-[#666] leading-relaxed mb-2">
                  {review.text}
                </p>
                
                {/* Actions: Reply, Like, Dislike */}
                <div className="flex items-center gap-4 text-xs text-[#9E9E9E]">
                  <button className="hover:text-[#C17F78] cursor-pointer 
                    font-medium transition-colors">
                    Reply
                  </button>
                  <div className="flex items-center gap-1">
                    <ThumbsUp size={12} className="cursor-pointer 
                      hover:text-[#C17F78]" />
                    <span>{review.likes}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ThumbsDown size={12} className="cursor-pointer 
                      hover:text-[#C17F78]" />
                    <span>{review.dislikes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right: Rating Summary + Promo Card */}
        <div className="space-y-6">
          {/* Overall Rating Card */}
          <div className="bg-white border border-[rgba(224,180,184,0.3)] 
            rounded-2xl p-6 text-center">
            <div className="text-5xl font-bold text-[#333333]">
              {overallRating}
              <span className="text-lg font-normal text-[#9E9E9E] ml-1">
                out of 5
              </span>
            </div>
            <div className="flex items-center justify-center gap-1 mt-2">
              {[1, 2, 3, 4, 5].map(star => (
                <Star
                  key={star}
                  size={20}
                  className="fill-[#F5A623] text-[#F5A623]"
                />
              ))}
            </div>
            <p className="text-sm text-[#9E9E9E] mt-2">
              ({totalReviews} Reviews)
            </p>
          </div>

          {/* Promotional Card ("Orisil Jewels 20% Off") */}
          <div className="bg-[#FFF6F7] border border-[rgba(224,180,184,0.3)] 
            rounded-2xl p-6">
            <h4 className="text-xl font-bold text-[#6D4C4E] mb-1 font-bodoni">
              Orisil Jewels
            </h4>
            <p className="text-2xl font-bold text-[#C17F78]">
              20% Off
            </p>
            <p className="text-xs text-[#9E9E9E] mt-2 mb-4">
              On your first order
            </p>
            <button className="border border-[#C17F78] text-[#C17F78] 
              hover:bg-[#C17F78] hover:text-white text-xs font-semibold 
              py-2 px-4 rounded-lg transition-colors cursor-pointer 
              flex items-center gap-2 mx-auto sm:mx-0">
              View details →
            </button>
          </div>
        </div>
      </div>

      {/* Divider */}
      <hr className="border-[rgba(224,180,184,0.3)] my-10" />

      {/* Add Your Review Form */}
      <div>
        <h3 className="text-lg font-bold text-[#333333] mb-1">
          Add your review
        </h3>
        <p className="text-xs text-[#9E9E9E] mb-6">
          Your email address will not be published. Required fields are marked*
        </p>

        <form onSubmit={handleSubmitReview} className="space-y-6">
          {/* Name + Email Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-[#333333] mb-2">
                Name*
              </label>
              <input
                type="text"
                placeholder="Ex. John Doe"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                required
                className="w-full border border-[rgba(224,180,184,0.3)] rounded-lg 
                  py-3 px-4 text-sm text-[#333333] placeholder:text-[#9E9E9E] 
                  focus:outline-none focus:border-[#C17F78] transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#333333] mb-2">
                Email*
              </label>
              <input
                type="email"
                placeholder="example@gmail.com"
                value={formEmail}
                onChange={(e) => setFormEmail(e.target.value)}
                required
                className="w-full border border-[rgba(224,180,184,0.3)] rounded-lg 
                  py-3 px-4 text-sm text-[#333333] placeholder:text-[#9E9E9E] 
                  focus:outline-none focus:border-[#C17F78] transition-colors"
              />
            </div>
          </div>

          {/* Your Rating */}
          <div>
            <label className="block text-sm font-semibold text-[#333333] mb-2">
              Your Rating*
            </label>
            <StarRatingInput value={formRating} onChange={setFormRating} />
          </div>

          {/* Review Title */}
          <div>
            <label className="block text-sm font-semibold text-[#333333] mb-2">
              Add Detailed Review*
            </label>
            <input
              type="text"
              placeholder="Write Title here"
              value={formTitle}
              onChange={(e) => setFormTitle(e.target.value)}
              className="w-full border border-[rgba(224,180,184,0.3)] rounded-lg 
                py-3 px-4 text-sm text-[#333333] placeholder:text-[#9E9E9E] 
                focus:outline-none focus:border-[#C17F78] transition-colors"
            />
          </div>

          {/* Review Text */}
          <div>
            <textarea
              placeholder="Write your detailed review here..."
              value={formText}
              onChange={(e) => setFormText(e.target.value)}
              required
              rows={4}
              className="w-full border border-[rgba(224,180,184,0.3)] rounded-lg 
                py-3 px-4 text-sm text-[#333333] placeholder:text-[#9E9E9E] 
                focus:outline-none focus:border-[#C17F78] transition-colors 
                resize-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-[#6D4C4E] hover:bg-[#C17F78] text-white text-sm 
              font-bold uppercase tracking-widest py-3.5 px-8 rounded-lg 
              transition-colors cursor-pointer"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
