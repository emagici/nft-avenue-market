import Avatar from "./index"

const people = [
  {
    name: 'Michael Foster',
    sales: '37.5 BNB',
    image: 'https://images.unsplash.com/photo-1555952517-2e8e729e0b44?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
  },
  {
    name: 'Michael Foster',
    sales: '37.5 BNB',
    image: 'https://images.unsplash.com/photo-1578916045370-25461e0cf390?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
  },
  {
    name: 'Michael Foster',
    sales: '37.5 BNB',
    image: 'https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
  },
  {
    name: 'Michael Foster',
    sales: '37.5 BNB',
    image: 'https://images.unsplash.com/photo-1523554888454-84137e72c3ce?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
  },
  {
    name: 'Michael Foster',
    sales: '37.5 BNB',
    image: 'https://images.unsplash.com/photo-1603344204980-4edb0ea63148?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
  },
  {
    name: 'Michael Foster',
    sales: '37.5 BNB',
    image: 'https://images.unsplash.com/photo-1608094510969-00a4353cea2d?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
  },
  {
    name: 'Michael Foster',
    sales: '37.5 BNB',
    image: 'https://images.unsplash.com/photo-1548809630-b1e80b396103?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
  },
  {
    name: 'Michael Foster',
    sales: '37.5 BNB',
    image: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
  },
]

export default function AvatarList() {
  return (
    <div className="">
      <div className="text-center">
        <div className="space-y-8 sm:space-y-12">
          <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4 md:grid-cols-6 md:gap-x-6 lg:gap-x-8 lg:gap-y-12 xl:grid-cols-8">
            {people.map((person, index) => (
              <li key={person.name}>
                <Avatar index={index} {...person} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
