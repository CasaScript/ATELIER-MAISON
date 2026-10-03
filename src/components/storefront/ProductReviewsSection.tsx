import React, { useState } from 'react';
import { Star, CheckCircle, ThumbsUp, MessageSquarePlus, X, Send, Sparkles, ShieldCheck } from 'lucide-react';
import { ProductReview } from '../../types';

interface ProductReviewsSectionProps {
  productId: string;
  productTitle: string;
  initialReviews?: ProductReview[];
}

export const ProductReviewsSection: React.FC<ProductReviewsSectionProps> = ({
  productId,
  productTitle,
  initialReviews = [],
}) => {
  const [reviews, setReviews] = useState<ProductReview[]>(initialReviews);
  const [showReviewForm, setShowReviewForm] = useState<boolean>(false);
  const [helpfulCounts, setHelpfulCounts] = useState<Record<string, number>>({});
  const [hasVotedHelpful, setHasVotedHelpful] = useState<Record<string, boolean>>({});
  const [formSuccessMessage, setFormSuccessMessage] = useState<string | null>(null);

  // New review form fields
  const [newRating, setNewRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [authorName, setAuthorName] = useState<string>('');
  const [location, setLocation] = useState<string>('Tunis');
  const [reviewTitle, setReviewTitle] = useState<string>('');
  const [comment, setComment] = useState<string>('');

  // Rating metrics
  const totalReviews = reviews.length;
  const averageRating = totalReviews > 0
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews
    : 5.0;

  // Distribution calculations
  const distribution = [5, 4, 3, 2, 1].map((starLevel) => {
    const count = reviews.filter((r) => r.rating === starLevel).length;
    const percentage = totalReviews > 0 ? Math.round((count / totalReviews) * 100) : 0;
    return { starLevel, count, percentage };
  });

  const handleVoteHelpful = (reviewId: string) => {
    if (hasVotedHelpful[reviewId]) return;
    setHelpfulCounts((prev) => ({
      ...prev,
      [reviewId]: (prev[reviewId] || 0) + 1,
    }));
    setHasVotedHelpful((prev) => ({
      ...prev,
      [reviewId]: true,
    }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !comment.trim() || !reviewTitle.trim()) return;

    const newRev: ProductReview = {
      id: `rev-${Date.now()}`,
      author: authorName.trim(),
      rating: newRating,
      date: 'À l’instant',
      location: location.trim() || 'Tunisie',
      title: reviewTitle.trim(),
      comment: comment.trim(),
      verifiedPurchase: true,
    };

    setReviews([newRev, ...reviews]);
    setFormSuccessMessage('Merci ! Votre avis a été enregistré et publié avec succès.');
    setShowReviewForm(false);
    setAuthorName('');
    setReviewTitle('');
    setComment('');
    setNewRating(5);

    setTimeout(() => {
      setFormSuccessMessage(null);
    }, 4000);
  };

  const getRatingLabel = (score: number) => {
    switch (score) {
      case 5: return 'Exceptionnel (5/5)';
      case 4: return 'Très bien (4/5)';
      case 3: return 'Moyen (3/5)';
      case 2: return 'Décevant (2/5)';
      case 1: return 'Insatisfaisant (1/5)';
      default: return '';
    }
  };

  return (
    <div className="space-y-6 pt-2">
      {/* Success Notification */}
      {formSuccessMessage && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl text-xs flex items-center gap-2 animate-fadeIn">
          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{formSuccessMessage}</span>
        </div>
      )}

      {/* Aggregate Rating Summary Card */}
      <div className="p-5 bg-stone-50 rounded-xl border border-stone-200/90 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Overall score */}
        <div className="text-center md:text-left space-y-1.5 shrink-0">
          <div className="flex items-baseline justify-center md:justify-start gap-2">
            <span className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 font-mono tabular-nums">
              {averageRating.toFixed(1)}
            </span>
            <span className="text-xs text-stone-500 font-mono">/ 5</span>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-1 text-amber-500">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                className={`w-4 h-4 ${
                  s <= Math.round(averageRating)
                    ? 'fill-amber-400 text-amber-400'
                    : 'text-stone-300'
                }`}
              />
            ))}
          </div>

          <p className="text-xs text-stone-600">
            Basé sur <strong className="font-semibold text-stone-900 font-mono tabular-nums">{totalReviews} avis</strong> vérifiés
          </p>
        </div>

        {/* Middle: Star breakdown progress bars */}
        <div className="w-full max-w-xs space-y-1 text-xs">
          {distribution.map((dist) => (
            <div key={dist.starLevel} className="flex items-center gap-2 text-stone-600">
              <span className="w-6 text-[11px] font-mono text-stone-500 text-right">{dist.starLevel}★</span>
              <div className="flex-1 bg-stone-200 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-amber-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${dist.percentage}%` }}
                />
              </div>
              <span className="w-8 text-[11px] font-mono text-stone-500 text-right tabular-nums">
                {dist.percentage}%
              </span>
            </div>
          ))}
        </div>

        {/* Right: CTA to write a review */}
        <div className="shrink-0 text-center md:text-right">
          <button
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="px-4 py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-2 shadow-xs"
          >
            <MessageSquarePlus className="w-4 h-4 text-amber-400" />
            <span>Donner mon avis</span>
          </button>
          <div className="flex items-center justify-center md:justify-end gap-1 text-[11px] text-stone-500 mt-2">
            <ShieldCheck className="w-3.5 h-3.5 text-stone-600" />
            <span>Avis authentiques 100% vérifiés</span>
          </div>
        </div>
      </div>

      {/* Write a Review Modal / Collapsible Form */}
      {showReviewForm && (
        <form onSubmit={handleFormSubmit} className="p-5 bg-white rounded-xl border border-stone-300 shadow-sm space-y-4 text-xs animate-fadeIn">
          <div className="flex items-center justify-between pb-2 border-b border-stone-200">
            <h4 className="font-serif font-bold text-sm text-stone-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Rédiger un avis sur {productTitle}</span>
            </h4>
            <button
              type="button"
              onClick={() => setShowReviewForm(false)}
              className="text-stone-400 hover:text-stone-600 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Interactive Star Rating Selector */}
          <div className="space-y-1.5">
            <label className="font-semibold text-stone-800 block">
              Votre note globale :
            </label>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => {
                  const effectiveStar = hoverRating || newRating;
                  return (
                    <button
                      key={star}
                      type="button"
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(null)}
                      onClick={() => setNewRating(star)}
                      className="p-1 focus:outline-none transition-transform hover:scale-110"
                      aria-label={`Attribuer ${star} étoiles`}
                    >
                      <Star
                        className={`w-6 h-6 transition-colors ${
                          star <= effectiveStar
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-stone-300'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
              <span className="text-xs font-semibold text-amber-900 font-mono">
                {getRatingLabel(hoverRating || newRating)}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-stone-700 block mb-1">Votre Nom & Prénom *</label>
              <input
                type="text"
                required
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="ex: Mohamed K."
                className="w-full bg-stone-50 border border-stone-300 rounded-md p-2 focus:ring-1 focus:ring-stone-900"
              />
            </div>

            <div>
              <label className="font-semibold text-stone-700 block mb-1">Ville / Gouvernorat en Tunisie</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="ex: La Marsa, Tunis"
                className="w-full bg-stone-50 border border-stone-300 rounded-md p-2 focus:ring-1 focus:ring-stone-900"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="font-semibold text-stone-700 block mb-1">Titre de votre avis *</label>
              <input
                type="text"
                required
                value={reviewTitle}
                onChange={(e) => setReviewTitle(e.target.value)}
                placeholder="ex: Qualité de fabrication irréprochable et livraison rapide !"
                className="w-full bg-stone-50 border border-stone-300 rounded-md p-2 focus:ring-1 focus:ring-stone-900"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="font-semibold text-stone-700 block mb-1">Votre Témoignage détaillé *</label>
              <textarea
                rows={3}
                required
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Parlez des finitions, de la texture, du respect des délais de livraison par Aramex/Yalidine ou du paiement en espèces..."
                className="w-full bg-stone-50 border border-stone-300 rounded-md p-2 focus:ring-1 focus:ring-stone-900 leading-relaxed"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setShowReviewForm(false)}
              className="px-3.5 py-2 border border-stone-300 rounded-md text-stone-700 hover:bg-stone-50 font-medium"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-stone-900 text-white rounded-md font-semibold hover:bg-stone-800 transition-colors flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Publier mon avis</span>
            </button>
          </div>
        </form>
      )}

      {/* Testimonials List */}
      <div className="space-y-3.5">
        {reviews.length === 0 ? (
          <div className="text-center py-8 text-stone-500 text-xs">
            Soyez le premier à donner votre avis sur cette création artisanale !
          </div>
        ) : (
          reviews.map((rev) => {
            const hasVoted = !!hasVotedHelpful[rev.id];
            const helpfulCount = (helpfulCounts[rev.id] || 0) + (rev.id === 'rev-101' ? 8 : 4);

            return (
              <div
                key={rev.id}
                className="p-4 bg-stone-50/80 rounded-xl border border-stone-200 space-y-2 text-xs transition-all hover:bg-stone-50"
              >
                {/* Review Header: Stars, Author, Location & Verified Badge */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                  <div className="flex items-center gap-2">
                    <div className="flex text-amber-500">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          className={`w-3.5 h-3.5 ${
                            s <= rev.rating
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-stone-300'
                          }`}
                        />
                      ))}
                    </div>

                    <span className="font-semibold text-stone-900">{rev.author}</span>

                    {rev.location && (
                      <>
                        <span aria-hidden="true" className="text-stone-300">·</span>
                        <span className="text-stone-500 text-[11px]">{rev.location}</span>
                      </>
                    )}
                  </div>

                  <div className="flex items-center gap-2 text-[11px]">
                    {rev.verifiedPurchase && (
                      <span className="inline-flex items-center gap-1 text-emerald-800 font-medium bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded-full">
                        <CheckCircle className="w-3 h-3 text-emerald-600" />
                        <span>Achat vérifié</span>
                      </span>
                    )}
                    <span className="text-stone-400">{rev.date}</span>
                  </div>
                </div>

                {/* Review Title */}
                <h5 className="font-serif font-bold text-stone-900 text-xs mt-1">
                  {rev.title}
                </h5>

                {/* Review Text */}
                <p className="text-stone-600 leading-relaxed">
                  {rev.comment}
                </p>

                {/* Helpful Button */}
                <div className="pt-2 flex items-center justify-end">
                  <button
                    onClick={() => handleVoteHelpful(rev.id)}
                    className={`flex items-center gap-1 text-[11px] transition-colors ${
                      hasVoted
                        ? 'text-emerald-700 font-semibold'
                        : 'text-stone-500 hover:text-stone-900'
                    }`}
                  >
                    <ThumbsUp className={`w-3 h-3 ${hasVoted ? 'fill-emerald-600' : ''}`} />
                    <span>Avis utile ({helpfulCount})</span>
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
