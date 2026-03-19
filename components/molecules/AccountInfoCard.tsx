'use client';
import { AccountInfoCardProps } from '@/interfaces';
import { CheckCircle, Crown, Shield, User, XCircle } from 'lucide-react';
import React from 'react';

const AccountInfoCard: React.FC<AccountInfoCardProps> = ({
  userRole,
  userName,
  userEmail,
  emailVerified,
}) => {
  return (
    <>
      {userRole && (
        <div
          className={`flex items-center justify-center gap-2 w-fit mx-auto mb-2 px-3 py-1 rounded-full ${
            userRole === 'ADMIN'
              ? 'bg-red-100 text-red-700'
              : userRole === 'MANAGER'
                ? 'bg-blue-100 text-blue-700'
                : userRole === 'USER'
                  ? 'bg-purple-100 text-purple-700'
                  : 'bg-gray-100 text-gray-600'
          }`}
        >
          {userRole === 'ADMIN' && <Shield size={14} />}
          {userRole === 'MANAGER' && <Crown size={14} />}
          {userRole === 'USER' && <User size={14} />}
          <span className="text-xs font-semibold capitalize">{userRole}</span>
        </div>
      )}
      <h1 className="text-(--fifth-color) font-semibold">{userName}</h1>
      <p className="text-(--six-color)">{userEmail}</p>
      <div
        className={`flex items-center justify-center gap-1 font-semibold mt-1 ${
          emailVerified ? 'text-green-600' : 'text-red-600'
        }`}
      >
        {emailVerified ? <CheckCircle size={16} /> : <XCircle size={16} />}
        <p>Email {emailVerified ? 'verified' : 'not verified'}</p>
      </div>
    </>
  );
};

export default AccountInfoCard;
