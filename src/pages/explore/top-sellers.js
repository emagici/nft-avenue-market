import React from 'react'
import Dropdown from '../../components/dropdown'
import SectionHeader from '../../components/section-header'
import AvatarList from '../../components/avatar/avatar-list'

export default function TopSellers() {
  return (
    <div className="py-20">
      <div className="max-w-screen-2xl mx-auto">
        <SectionHeader title="Top Sellers" />
        <AvatarList />
      </div>
    </div>
  )
}
